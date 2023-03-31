import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { DashboardLayoutComponent } from "./components/layouts/dashboard-layout/dashboard-layout.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (opt) => opt.DashboardModule
          ),
      },
      // {
      //   path: "assets",
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import("./pages/dashboard/dashboard.module").then(
      //       (opt) => opt.DashboardModule
      //     ),
      // },
      // {
      //   path: "spareparts",
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import("./pages/dashboard/dashboard.module").then(
      //       (opt) => opt.DashboardModule
      //     ),
      // },
      // {
      //   path: "configurations",
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import("./pages/dashboard/dashboard.module").then(
      //       (opt) => opt.DashboardModule
      //     ),
      // },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
    children: [
      {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
      },
      {
        path: "login",
        loadChildren: () =>
          import("./pages/auth/auth.module").then((opt) => opt.AuthModule),
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
