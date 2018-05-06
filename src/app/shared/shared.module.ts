import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ModalUploadComponent,
    BreadcrumbsComponent,
    NopagefoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ModalUploadComponent,
    BreadcrumbsComponent
  ],
  providers: []
})
export class SharedModule { }
