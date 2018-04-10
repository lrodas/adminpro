import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosServices: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosServices.cargarMedicos()
          .subscribe( medicos => this.medicos = medicos);
  }

  buscarMedicos(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosServices.buscarMedicos(termino)
          .subscribe(medicos => {
            this.medicos = medicos;
          });
  }

  eliminarMedico(medico: Medico) {
    this._medicosServices.borrarMedico(medico._id)
            .subscribe( () => this.cargarMedicos());
  }

}
