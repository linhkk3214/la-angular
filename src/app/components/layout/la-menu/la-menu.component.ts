import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'la-menu',
  templateUrl: './la-menu.component.html',
  styleUrls: ['./la-menu.component.scss']
})
export class LAMenuComponent implements OnInit {
  lstMenu: any[] = [];
  constructor(
    private _httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    const pathActive = window.location.pathname;
    this._httpClient.get('./assets/menu.json')
      .subscribe((lstMenu: any[]) => {
        this.lstMenu = [
          {
            path: '',
            label: 'Quản lý nhập học',
            children: [
              {
                "path": "/dotnhaphoc",
                "label": "Đợt nhập học"
              }

            ]
          },
          ...lstMenu
        ];
        this.lstMenu.forEach(item => {
          this.deQuySetParent(item);
        })
        this.setActiveByPath(this.lstMenu, pathActive);
      });
  }

  deQuySetParent(itemMenu) {
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
}
