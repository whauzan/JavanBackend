import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { RestapiService } from "src/app/service/restapi.service";
import { assetsFormModel, headArray } from "./assets";

@Component({
  selector: "app-assets",
  templateUrl: "./assets.component.html",
})
export class AssetsComponent implements OnInit {
  constructor(
    private service: RestapiService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  assets: any;
  type: "assets" | "configurations" | "spareparts" = "assets";
  dataTable: any;
  headArray = headArray;
  assetsFormModel = assetsFormModel;
  assetsForm = this.builder.group({
    id: this.builder.control("", Validators.required),
    assetName: this.builder.control("", Validators.required),
    serialNumber: this.builder.control("", Validators.required),
    type: this.builder.control("", Validators.required),
    locationId: this.builder.control("", Validators.required),
    modelNumber: this.builder.control("", Validators.required),
    manufacturer: this.builder.control("", Validators.required),
    currentStatus: this.builder.control("", Validators.required),
  });

  ngOnInit(): void {
    this.service.getAssets().subscribe((item) => {
      this.assets = item;
      for (const element of this.assets) {
        this.service.getLocationById(element.locationId).subscribe((item) => {
          element["location"] = item;
          element["locationName"] = element["location"].locationName;
        });
      }
      this.dataTable = this.assets;
    });

    this.service.getLocations().subscribe((item) => {
      const temp: any = item;
      for (const element of this.assetsFormModel) {
        if (element["label"] == "Location") {
          for (const val of temp) {
            element["options"]?.push({
              label: val["locationName"],
              value: val["id"],
            });
          }
        }
      }
    });
  }

  OnSearch(value: string) {
    if (value != "") {
      this.dataTable = this.assets.filter((item: any) => {
        return (
          item.assetName.toLowerCase().includes(value.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          item.locationName.toLowerCase().includes(value.toLowerCase()) ||
          item.modelNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(value.toLowerCase()) ||
          item.currentStatus.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.dataTable = this.assets;
    }
  }

  OpenDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        FormModel: this.assetsFormModel,
        Form: this.assetsForm,
        Type: this.type,
        Method: "Post",
      },
      width: "1200px",
      minHeight: "600px",
    });
  }
}
