import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "./user.model";
import { UserService } from "./user.service";
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";

@Component({
  selector: "app-login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggingIn = true;
  user: User;
  processing = false;
  @ViewChild("password", { static: false }) password: ElementRef;
  token;

  constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.username = "";
    this.user.password = "";
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.username || !this.user.password) {
      this.alert("Please provide both an user name and password.");
      return;
    }
    this.processing = true;

    this.login();
  }

  login() {
    this.userService.login(this.user)
      .subscribe(res => {
        this.processing = false;
        this.token = (<any>res).token;
        setString("username", this.user.username);
        setString("token", this.token);
        this.routerExtensions.navigate(["/landingpage"], { clearHistory: true });
      },
        error => {
          this.alert("Username or password is incorrect!!");
          this.processing = false;
        }
      );
  }


  focusPassword() {
    this.password.nativeElement.focus();
  }

  alert(message: string) {
    return alert({
      title: "Edu Sync",
      okButtonText: "OK",
      message: message
    });
  }
}

