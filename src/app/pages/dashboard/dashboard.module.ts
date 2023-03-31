import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { AssetsComponent } from './assets/assets.component';
import { SparepartsComponent } from './spareparts/spareparts.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { TableComponent } from "../../components/table/table.component";
import { MaterialModule } from 'src/Material-Module';
import { ButtonStatusComponent } from 'src/app/components/button-status/button-status.component';


@NgModule({
  declarations: [
    HomeComponent,
    AssetsComponent,
    SparepartsComponent,
    ConfigurationComponent,
    TableComponent,
    ButtonStatusComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
