import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
})
export class TableComponent implements OnInit {
  @Input() HeadArray: { label: string; data: string }[] = [];
  @Input() DataArray: any[] = [];
  constructor() {}

  ngOnInit(): void {}

  ShowStatus(value: string) {
    return value == "currentStatus";
  }
}
