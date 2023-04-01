import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
})
export class TableComponent implements OnInit {
  @Input() HeadArray: { label: string; data: string }[] = [];
  @Input() DataArray: any[] = [];
  @Input() FormModel: any[] = [];
  @Input() Form: any;
  @Input() Type: "assets" | "configurations" | "spareparts" = "assets";
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  ShowStatus(value: string) {
    return value == "currentStatus";
  }

  OpenDialog(id: number) {
    if (!this.router.url.includes("home")) {
      const dataForm = this.DataArray.find((item) => item.id == id);

      for (const element of this.FormModel) {
        element["value"] = dataForm[element["data"]];
      }
      this.dialog.open(DialogComponent, {
        data: {
          Type: this.Type,
          FormModel: this.FormModel,
          Form: this.Form,
          Method: "Get",
        },
        width: "1200px",
        minHeight: "600px",
      });
    }
  }
}
