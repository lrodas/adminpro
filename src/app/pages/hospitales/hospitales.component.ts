import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando = false;
  hospitales: Hospital[] = [];
  totalHospitales = 0;
  desde = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe(resp => {
            this.cargarHospitales();
          });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
            .subscribe((resp: any) => {
              this.hospitales = resp.hospital;
              this.totalHospitales = resp.totalHospitales;
              this.cargando = false;
            });
  }

  obtenerHospital(id: string) {
    this._hospitalService.buscarHospital(id)
          .subscribe(resp => {
            console.log(resp);
          });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalHospitales ) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
            .subscribe((resp: any) => {
              this.hospitales = resp;
              this.cargando = false;
            });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      buttons: true,
      icon: 'info',
      dangerMode: true
    })
    .then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor)
            .subscribe(resp => {
              this.cargarHospitales();
            });
    });
  }

  eliminarHospital(id: string) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar un hospital',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {

      if (borrar) {
        this._hospitalService.borraHospital(id)
          .subscribe(resp => {
            this.cargarHospitales();
          });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.guardarHospital(hospital)
          .subscribe( resp => {
            this.cargarHospitales();
          });
  }

}
