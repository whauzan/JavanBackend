import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RestapiService } from "src/app/service/restapi.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(
    private route: Router,
    private service: RestapiService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    // localStorage.clear();
  }

  respData: any;
  loginForm = this.builder.group({
    username: this.builder.control("", Validators.required),
    password: this.builder.control("", Validators.required),
  });

  Login() {
    if (this.loginForm.valid) {
      const data: { username: string; password: string } = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };
      this.service.AuthUser(data).subscribe((item) => {
        this.respData = item;
        if (this.respData.length != 0) {
          if (this.respData[0].role != "Admin") {
            alert("Anda tidak memiliki akses");
            return;
          }
          localStorage.setItem("user", JSON.stringify(this.respData));
          this.route.navigate(["/dashboard/home"]);
        } else {
          alert("Login gagal");
        }
      });
    }
  }
}
