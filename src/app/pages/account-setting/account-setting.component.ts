import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( color: string, link: any ) {
    console.log( link );

    this.aplicarCheck( link );

    this._ajustes.aplicarTema( color );

  }

  aplicarCheck( link: any ) {
    const selectores: any = document.getElementsByClassName( 'selector' );

    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName( 'selector' );

    const tema = this._ajustes.ajustes.tema;

    for ( const ref of selectores ) {
      if ( ref.getAttribute( 'data-theme' ) === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
