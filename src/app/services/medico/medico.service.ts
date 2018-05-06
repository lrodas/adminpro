import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';

@Injectable()
export class MedicoService {

  public desde = 0;
  public totalMedicos = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico?desde=' + this.desde;

    return this.http.get(url)
                .map( (resp: any) => {
                  this.totalMedicos = resp.totalMedicos;
                  return resp.medicos;
                });
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get(url)
                .map((resp: any) => resp.medico);
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                  .map(resp => {
                    swal('Medico borrado', 'Medico borrado correctamente', 'success');
                    return resp;
                  });
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando medico ya existente
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
                  .map( (resp: any) => {
                    swal( 'Medico Actualizado', medico.nombre, 'success' );
                    return resp.medico;
                  });
    } else {
      // Creando nuevo medico

      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
          .map( (resp: any) => {
            swal( 'Medico creado', medico.nombre, 'success' );
            return resp.medico;
          });
    }
  }

  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
            .map( (resp: any) => resp.medico);
  }

}
