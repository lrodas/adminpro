import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTING } from './pages.routes';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    NopagefoundComponent
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
    PAGES_ROUTING
  ]
})
export class PagesModule { }
