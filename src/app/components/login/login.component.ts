import { Component } from "@angular/core";
import { UserService } from "../user/services/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  data: any = {};

  constructor(
    _userService: UserService
  ) {

  }
  login() {
    console.log(this.data);
  }
}
