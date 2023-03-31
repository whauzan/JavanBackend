import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  user: any;
  username: string | undefined;

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    if (this.user != null) {
      this.user = JSON.parse(this.user);
      this.username = this.user[0].fullname;
    } else {
      console.log("No user");
    }
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
