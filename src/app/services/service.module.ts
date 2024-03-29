import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  SharedsService,
  SidebarService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  VerificaTokenGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedsService,
    SidebarService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
