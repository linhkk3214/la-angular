import { Component, ElementRef, Injector, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Operator } from "../../shared/models/enums";
import { ComponentBase } from "../../shared/base-class/component-base";
import { UserService } from "../user/services/user.service";
import { KeyStorageUserInfo, KeySubscribeLogon } from "../../models/const";
import { ContextService } from "../../shared/services/context.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentBase {
  _userName: ElementRef;
  @ViewChild('username', { static: false }) set username(value: ElementRef) {
    this._userName = value;
  }
  data: any = {};
  rememberMe = true;

  constructor(
    private _injector: Injector,
    private _router: Router,
    private _userService: UserService,
    private _contextService: ContextService
  ) {
    super(_injector);
  }

  async login() {
    const missings = [];
    if (!this.data.username) {
      missings.push('tài khoản');
    }
    if (!this.data.password) {
      missings.push('mật khẩu');
    }

    if (missings.length) {
      return this.toastWarning(`Hãy nhập ${missings.join(', ')}`);
    }
    const itemUser = (await this._userService.getDetailByFilter([
      this.newFilter('username', Operator.equal, this.data.username),
      this.newFilter('password', Operator.equal, this.data.password)
    ])).data;
    if (!itemUser) {
      this.toastError('Tài khoản hoặc mật khẩu không đúng');
      return;
    }

    localStorage.setItem(KeyStorageUserInfo, JSON.stringify(itemUser));
    this._contextService.fireEvent(KeySubscribeLogon, true);
    setTimeout(() => {
      this._router.navigate(['dashboard']);
    }, 1000);
  }
}
