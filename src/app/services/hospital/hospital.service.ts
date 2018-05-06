import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {}

  cargarHospitales(desde: number) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url)
                .map((resp: any) => {
                  return resp;
                });
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
                .map( (resp: any) => {
                  return resp.hospital;
                });
  }

  buscarHospital(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get(url)
                .map((resp: any) => {
                  return resp.hospital;
                });
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
                .map((resp: any) => {
                  swal(resp.hospital.nombre, 'Hospital creado Exitosamente', 'success');
                  return resp.hospital;
                });
  }

  borraHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                .map((resp: any) => {
                  swal(resp.hospital.nombre, 'Hospital eliminado Exitosamente', 'success');
                  return resp.hospital;
                });
  }

  guardarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                .map( (resp: any) => {
                  swal(resp.hospital.nombre, 'Hospital actualizado exitosamente', 'success');
                  return resp.hospital;
                });
  }
}
