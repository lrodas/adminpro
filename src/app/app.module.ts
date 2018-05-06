import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { ServiceModule } from './services/service.module';

import { APP_ROUTING } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
