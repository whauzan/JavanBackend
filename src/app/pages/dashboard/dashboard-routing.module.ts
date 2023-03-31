import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HomeComponent } from './home/home.component';
import { SparepartsComponent } from './spareparts/spareparts.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "assets",
    component: AssetsComponent,
  },
  {
    path: "spareparts",
    component: SparepartsComponent,
  },
  {
    path: "configurations",
    component: ConfigurationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
