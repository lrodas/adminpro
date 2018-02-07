import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SharedsService } from './services/shareds.service';
import { SidebarService } from './services/sidebar.service';
import { RegisterComponent } from './login/register.component';

import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule
  ],
  providers: [
    SharedsService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
