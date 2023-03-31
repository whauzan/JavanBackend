import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { DashboardLayoutComponent } from "./components/layouts/dashboard-layout/dashboard-layout.component";
import { MaterialModule } from "src/Material-Module";
import { HttpClientModule } from "@angular/common/http";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from "./components/form/form.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    NotFoundComponent,
    DashboardLayoutComponent,
    DialogComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AvatarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
