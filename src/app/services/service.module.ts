import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedsService, SidebarService, SettingsService } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SharedsService,
    SidebarService,
    SettingsService
  ],
  declarations: []
})
export class ServiceModule { }
