import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficasComponent } from './graficas/graficas.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const app_routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficas', component: GraficasComponent },
      { path: 'promesas', component: PromesasComponent },
      { path: 'rxjs', component: RxjsComponent },
      { path: 'account-setting', component: AccountSettingComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  },
];

export const PAGES_ROUTING = RouterModule.forChild( app_routes );
