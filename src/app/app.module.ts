import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CallComponent } from './call/call.component';
import { UILibraryModule } from '@amc-technology/ui-library';

@NgModule({
  declarations: [AppComponent, CallComponent],
  imports: [BrowserModule, UILibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
