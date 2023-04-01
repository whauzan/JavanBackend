import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/components/dialog/dialog.component";
import { RestapiService } from "src/app/service/restapi.service";
import { headArray, sparepartsFormModel } from "./spareparts";

@Component({
  selector: "app-spareparts",
  templateUrl: "./spareparts.component.html",
})
export class SparepartsComponent implements OnInit {
  constructor(
    private service: RestapiService,
    private dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  spareparts: any;
  type: "assets" | "configurations" | "spareparts" = "spareparts";
  dataTable: any;
  headArray = headArray;
  sparepartsFormModel = sparepartsFormModel;
  sparepartsForm = this.builder.group({
    id: this.builder.control("", Validators.required),
    sparepartName: this.builder.control("", Validators.required),
    quantity: this.builder.control("", Validators.required),
    type: this.builder.control("", Validators.required),
    locationId: this.builder.control("", Validators.required),
    modelNumber: this.builder.control("", Validators.required),
    manufacturer: this.builder.control("", Validators.required),
    currentStatus: this.builder.control("", Validators.required),
  });

  ngOnInit(): void {
    this.service.getSpareparts().subscribe((item) => {
      this.spareparts = item;
      for (const element of this.spareparts) {
        this.service.getLocationById(element.locationId).subscribe((item) => {
          element["location"] = item;
          element["locationName"] = element["location"].locationName;
        });
      }
      this.dataTable = this.spareparts;
    });

    this.service.getLocations().subscribe((item) => {
      const temp: any = item;
      for (const element of this.sparepartsFormModel) {
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
      this.dataTable = this.spareparts.filter((item: any) => {
        return (
          item.sparepartName.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          item.locationName.toLowerCase().includes(value.toLowerCase()) ||
          item.modelNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(value.toLowerCase()) ||
          item.quantity == parseInt(value) ||
          item.currentStatus.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.dataTable = this.spareparts;
    }
  }

  OpenDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        FormModel: this.sparepartsFormModel,
        Form: this.sparepartsForm,
        Type: this.type,
        Method: "Post",
      },
      width: "1200px",
      minHeight: "600px",
    });
  }
}
