import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MFDynamicFormModule} from "../../../mf-dynamic-form/src/lib/dynamic-form.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MFDynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
