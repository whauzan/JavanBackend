import { Component } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
})
export class BreadcrumbComponent {
  currentRoute: string;
  currentRoutes: string[];

  constructor(private router: Router) {
    this.currentRoute = "";
    this.currentRoutes = [""];
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url != "/dashboard/home") {
          this.currentRoutes = event.url.split("/");
          this.currentRoute = `/ ${this.currentRoutes[2]
            .charAt(0)
            .toUpperCase()}${this.currentRoutes[2].slice(1)}`;
        } else {
          this.currentRoute = "";
        }
      }
    });
  }
}
