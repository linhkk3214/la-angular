import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'la-menu',
  templateUrl: './la-menu.component.html',
  styleUrls: ['./la-menu.component.scss']
})
export class LAMenuComponent implements OnInit {
  lstMenu: any[] = [];
  keyword: any;
  lstMenuFull = [];
  filteredMenu = [];
  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    const pathActive = window.location.pathname;
    this._httpClient.get('./assets/menu.json')
      .subscribe((lstMenu: any[]) => {
        lstMenu.forEach(item => {
          if (!item.icon) {
            item.icon = 'pi pi-th-large';
          }
          if (item.children) {
            item.children.forEach(child => {
              if (!child.icon) {
                child.icon = 'pi pi-star';
              }
            });
          }
        });
        const lstMenuCombine = [
          {
            path: '',
            label: 'Trang chủ',
            icon: 'pi pi-home'
          },
          ...lstMenu
        ];
        lstMenuCombine.forEach(item => {
          this.deQuySetParent(item);
        })
        this.setActiveByPath(lstMenuCombine, pathActive);
        this.lstMenu = lstMenuCombine;
      });
  }

  deQuySetParent(itemMenu) {
    if (itemMenu.path) {
      this.lstMenuFull.push(
        { value: itemMenu.path, label: itemMenu.label }
      );
    }
    if (!itemMenu.children) return;
    itemMenu.children.forEach(item => {
      item.parent = itemMenu;
      this.deQuySetParent(item);
    })
  }

  setActiveByPath(lstMenu, path: string) {
    let found = false;
    lstMenu.forEach(item => {
      if (item.path == path) {
        found = true;
        item.active = true;
        return;
      }
      if (item.children) {
        const result = this.setActiveByPath(item.children, path);
        if (result) {
          found = true;
          item.active = true;
          item.expanded = true;
        };
        return;
      }
    });
    return found;
  }

  handleClickMenu(evt, itemMenu) {
    if (!itemMenu.path) {
      itemMenu.expanded = !itemMenu.expanded;
      evt.stopPropagation();
      evt.preventDefault();
    }
    this.deQuyRemoveActive(this.lstMenu);
    itemMenu.active = true;
    this.deQuySetActive(itemMenu);
  }

  deQuySetActive(itemMenu) {
    itemMenu.active = true;
    if (itemMenu.parent) this.deQuySetActive(itemMenu.parent);
  }

  deQuyRemoveActive(lstMenu) {
    lstMenu.forEach(itemMenu => {
      itemMenu.active = false;
      if (itemMenu.children) {
        this.deQuyRemoveActive(itemMenu.children);
      }
    });
  }

  filterMenu(evt: any) {
    let filtered: any[] = [];
    let query = evt.query.toLowerCase();
    for (let i = 0; i < this.lstMenuFull.length; i++) {
      let itemMenu = this.lstMenuFull[i];
      if (itemMenu.label.toLowerCase().indexOf(query) > -1) {
        filtered.push(itemMenu);
      }
    }

    this.filteredMenu = filtered;
  }

  selectMenu(evt: any) {
    this.keyword = '';
    this.filteredMenu = [];
    this.deQuyRemoveActive(this.lstMenu);
    this.setActiveByPath(this.lstMenu, evt.value);
    this._router.navigate([evt.value]);
  }
}
