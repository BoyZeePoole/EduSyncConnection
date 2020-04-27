import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page.routing.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    NativeScriptCommonModule,
    LandingPageRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LandingPageModule { }
