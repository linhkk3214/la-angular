import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KeyStorageDefaultSetting, KeyStorageUserInfo, KeySubscribeLogon, PrefixFieldObjectDropdown } from './models/const';
import { FormState } from './shared/models/enums';
import { CrudFormData, DialogModel, PopupSize } from './shared/models/schema';
import { ContextService } from './shared/services/context.service';
import { FileService } from './shared/services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements OnInit, OnDestroy {
  showMenu = true;
  showHelp = false;
  user: any;
  showContext = false;
  clickedContextMenuUser = false;
  textSetting = '';
  thongTinCaNhanModel = new DialogModel({
    header: 'Thông tin cá nhân',
    popupSize: new PopupSize({
      height: 700,
      width: 1200

      // maximize: true
    })
  })
  settingDialogModel = new DialogModel({
    header: 'Cấu hình mặc định',
    popupSize: new PopupSize({
      width: 600,
      height: 350
    }),
    data: new CrudFormData()
  });
  constructor(
    private _router: Router,
    private _contextService: ContextService,
    private _fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this._contextService.subscribe(KeySubscribeLogon, p => {
      this.checkUserLogon();
    });
    this.checkUserLogon();
    this.loadTextDefaultSetting();
    document.addEventListener('click', this.checkClickOut);
  }

  ngOnDestroy(): void {
    this._contextService.destroyContext();
    document.removeEventListener('click', this.checkClickOut);
  }

  async checkUserLogon() {
    const userCurrent = localStorage.getItem(KeyStorageUserInfo);
    if (!userCurrent) {
      this._router.navigate(['login']);
    }
    else {
      const user = JSON.parse(userCurrent);
      if (user.avatar) {
        const itemAvatar = (await this._fileService.getDetail(user.avatar)).data;
        if (itemAvatar) {
          user.srcAvatar = `http://localhost:3000/file/download/${itemAvatar.url}`;
        }
      }
      this.user = user;
    }
  }

  // Tính toán text hiển thị cấu hình mặc định ở header
  loadTextDefaultSetting() {
    const jsonDefaultSetting = localStorage.getItem(KeyStorageDefaultSetting);
    if (!jsonDefaultSetting) return;
    const defaultSetting = JSON.parse(jsonDefaultSetting);
    const heDaoTao = defaultSetting[`${PrefixFieldObjectDropdown}idHeDaoTao`].ma;
    const namHoc = defaultSetting[`${PrefixFieldObjectDropdown}namHoc`].label;
    const hocKy = defaultSetting[`${PrefixFieldObjectDropdown}idHocKy`].label;

    this.textSetting = `${heDaoTao}/${namHoc}/${hocKy}`;
  }

  checkClickOut = evt => {
    if (!this.showContext) return;
    if (!evt.target || !(evt.target as HTMLElement).closest('.user-info')) {
      this.showContext = false;
      this.clickedContextMenuUser = false;
    }
    else if (!this.clickedContextMenuUser) {
      this.showContext = false;
    }
  };

  showContextMenuUser() {
    this.showContext = true;
    this.clickedContextMenuUser = !this.clickedContextMenuUser;
  }

  logout() {
    localStorage.removeItem(KeyStorageUserInfo);
    this.user = null;
    this.showContext = false;
    this._router.navigate(['login']);
  }

  showDefaultSetting() {
    this.settingDialogModel.showEditForm = true;
  }

  viewThongTinCaNhan() {
    this.thongTinCaNhanModel.data.formModel = new CrudFormData();
    this.thongTinCaNhanModel.data.formModel.formState = FormState.EDIT;
    this.thongTinCaNhanModel.data.formModel.data = { _id: this.user._id };
    this.thongTinCaNhanModel.showEditForm = true;
  }
}
