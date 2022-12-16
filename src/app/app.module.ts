import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IfDataOkDirective } from './narrowing/if-data-ok.directive';

@NgModule({
  declarations: [
    AppComponent,
    IfDataOkDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
