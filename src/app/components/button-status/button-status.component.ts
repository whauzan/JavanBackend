import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button-status",
  templateUrl: "./button-status.component.html",
})
export class ButtonStatusComponent implements OnInit {
  @Input() Status: string = "";
  constructor() {}

  color: string = "";

  ngOnInit(): void {
    if (
      this.Status.toLowerCase() == "stopped" ||
      this.Status.toLowerCase() == "empty"
    ) {
      this.color = "red";
    } else if (
      this.Status.toLowerCase() == "running" ||
      this.Status.toLowerCase() == "sufficient"
    ) {
      this.color = "green";
    } else if (
      this.Status.toLowerCase() == "maintenance" ||
      this.Status.toLowerCase().includes("<")
    ) {
      this.color = "yellow";
    }
  }
}
