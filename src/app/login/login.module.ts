import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { LoginRoutingModule } from "./login.routing.module";
import { LoginComponent } from "./login.component";
import { UserService } from "./user.service";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class LoginModule { }