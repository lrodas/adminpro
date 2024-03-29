import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/throw';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
                .map( (resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token);
                  console.log('Token renovado');

                  return true;
                })
                .catch( err => {
                  swal('No se pudo renovar token', 'No fue posible renovar el token', 'error');
                  this.router.navigate(['/login']);
                  return Observable.throw(err);
                });
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map( (resp: any) => {
        swal('Usuario creado: ', usuario.email, 'success');
        return resp.usuario;
      })
      .catch( err => {
        console.log(err.error.mensaje);
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
            .map((resp: any) => {
              this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
              return true;
            });
  }

  login(usuario: Usuario, recodar: boolean = false) {

    if (recodar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
      .catch( err => {
        console.log(err.error.mensaje);
        swal('Error en el login', err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
                  .map( (resp: any) => {

                    if (usuario._id === this.usuario._id) {
                      const usuarioDB: Usuario = resp.usuario;
                      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    }
                    swal('Usuario actualizado', usuario.nombre + ' ' + usuario.apellido, 'success');
                    return true;
                  })
                  .catch( err => {
                    console.log(err.error.mensaje);
                    swal(err.error.mensaje, err.error.errors.message, 'error');
                    return Observable.throw(err);
                  });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then((resp: any) => {
            this.usuario.img = resp.usuario.img;
            this.guardarStorage(id, this.token, this.usuario, this.menu);
            swal('Imagen Actualizada!', this.usuario.nombre + ' ' + this.usuario.apellido, 'success');
          })
          .catch(resp => {
            console.log(resp);
          });
  }

  cargarUsuario(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarusuario(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

    return this.http.get(url)
                .map((resp: any) => resp.usuario);
  }

  borrarUsuario(id: String) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
                .map(resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                });
  }

}
