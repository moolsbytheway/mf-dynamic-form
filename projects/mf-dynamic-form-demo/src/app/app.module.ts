import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MfDynamicFormModule} from 'mf-dynamic-form';

import {AppComponent} from './app.component';
import {ExempleCustomFormControlComponent} from './custom-form-controls/exemple-custom-form-control.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExempleCustomFormControlComponent
  ],
    imports: [
        BrowserModule, MfDynamicFormModule, ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
