import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  susbcription: Subscription;

  constructor() {

    this.susbcription = this.regresaObservable()
      .subscribe(
      numero => console.log('Subs', numero),
      error =>  console.error('Error en el obs', error),
      () => console.log('El observador termino'),
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }

  private regresaObservable(): Observable<any> {

    return new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if( contador === 3 ){
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if( contador === 2 ){
        //   clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 500);

    }).retry(1)
    .map( (resp: any) => {
        return resp.valor + 1 ;
    })
    .filter( (valor, index) => {

        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
    });
  }

}
