import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { RestapiService } from "src/app/service/restapi.service";
import { headArray, configFormModel } from "./configuration";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
})
export class ConfigurationComponent implements OnInit {
  constructor(
    private service: RestapiService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  configurations: any;
  type: "assets" | "configurations" | "spareparts" = "configurations"
  dataTable: any;
  headArray = headArray;
  configFormModel = configFormModel;
  configForm = this.builder.group({
    id: this.builder.control("", Validators.required),
    configName: this.builder.control("", Validators.required),
    type: this.builder.control("", Validators.required),
    details: this.builder.control("", Validators.required),
  });

  ngOnInit(): void {
    this.service.getConfigurations().subscribe((item) => {
      this.configurations = item;
      this.dataTable = this.configurations;
    });
  }

  OnSearch(value: string) {
    console.log(this.configurations);
    
    if (value != "") {
      this.dataTable = this.configurations.filter((item: any) => {
        return (
          item.configName.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          item.details.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.dataTable = this.configurations;
    }
  }

  OpenDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        FormModel: this.configFormModel,
        Form: this.configForm,
        Type: this.type,
        Method: "Post",
      },
      width: "1200px",
      minHeight: "600px",
    });
  }
}
