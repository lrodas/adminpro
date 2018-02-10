import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTING } from './pages.routes';
import { ChartsModule } from 'ng2-charts';

//Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    NopagefoundComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    NopagefoundComponent
  ],
  imports:[
    SharedModule,
    PAGES_ROUTING,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
