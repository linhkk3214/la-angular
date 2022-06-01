import { Component, Injector } from "@angular/core";
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
  data: any = {};
  error: any = {};

  constructor(
    private _injector: Injector,
    private _router: Router,
    private _userService: UserService,
    private _contextService: ContextService
  ) {
    super(_injector);
  }

  async login() {
    this.error = {};
    let error = false;
    if (!this.data.username) {
      this.error.username = 'Hãy nhập tài khoản';
      error = true;
    }
    if (!this.data.password) {
      this.error.password = 'Hãy nhập mật khẩu';
      error = true;
    }

    if (error) return;
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
