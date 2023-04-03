import { Component, OnInit } from "@angular/core";
import { RestapiService } from "src/app/service/restapi.service";
import {
  assetsMaintenanceHead,
  emptySparepartsHead,
  headArray,
  inactiveAssetsHead,
} from "./home";
import { ExcelService } from "src/app/service/excel.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  constructor(
    private service: RestapiService,
    private excelService: ExcelService
  ) {}

  history: any;
  dataTable: any;
  headArray = headArray;
  emptySpareparts: any;
  emptySparepartsHead = emptySparepartsHead;
  inactiveAssets: any;
  inactiveAssetsHead = inactiveAssetsHead;
  assetsMaintenance: any;
  assetsMaintenanceHead = assetsMaintenanceHead;

  ngOnInit(): void {
    this.service.getHistory().subscribe((item) => {
      this.history = item;
      for (const element of this.history) {
        this.service.getUserById(element.userId).subscribe((item) => {
          element["user"] = item;
          element["userfullname"] = element["user"].fullname;
        });
        this.service.getAssetById(element.assetId).subscribe((item) => {
          element["asset"] = item;
        });
        this.service.getConfigById(element.configId).subscribe((item) => {
          element["configuration"] = item;
        });
        this.service.getSparepartById(element.sparepartId).subscribe((item) => {
          element["sparepart"] = item;
        });
        let dateFormat = new Date(parseInt(element["created_at"]));

        element[
          "created_at"
        ] = `${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
      }
      this.dataTable = this.history;

      this.service.getSpareparts().subscribe((item) => {
        this.emptySpareparts = item;
        this.emptySpareparts = this.emptySpareparts.filter(
          (item: { currentStatus: string }) =>
            item.currentStatus != "Sufficient"
        );
        for (const element of this.emptySpareparts) {
          this.service.getLocationById(element.locationId).subscribe((item) => {
            element["location"] = item;
            element["locationName"] = element["location"].locationName;
          });
        }
      });

      this.service.getAssets().subscribe((item) => {
        this.inactiveAssets = item;
        this.inactiveAssets = this.inactiveAssets.filter(
          (item: { currentStatus: string }) => item.currentStatus != "Running"
        );
        for (const element of this.inactiveAssets) {
          this.service.getLocationById(element.locationId).subscribe((item) => {
            element["location"] = item;
            element["locationName"] = element["location"].locationName;
          });
        }
      });

      this.service.getAssets().subscribe((item) => {
        this.assetsMaintenance = item;
        this.assetsMaintenance = this.assetsMaintenance.filter(
          (item: { currentStatus: string }) =>
            item.currentStatus == "Maintenance"
        );
        for (const element of this.assetsMaintenance) {
          this.service.getLocationById(element.locationId).subscribe((item) => {
            element["location"] = item;
            element["locationName"] = element["location"].locationName;
          });
        }
      });
    });
  }

  OnSearch(value: string): void {
    if (value != "") {
      this.dataTable = this.history.filter((item: any) => {
        return (
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.userfullname.toLowerCase().includes(value.toLowerCase()) ||
          item.details.toLowerCase().includes(value.toLowerCase())
        );
      });
    } else {
      this.dataTable = this.history;
    }
  }

  exportExcel(): void {
    const fileToExport = this.history.map((items: any) => {
      return {
        Id: items?.id,
        Title: items?.title,
        User: items?.userfullname,
        Detail: items?.details,
        Time: items?.created_at,
      };
    });

    this.excelService.exportToExcel(
      fileToExport,
      "History-" + new Date().getTime() + ".xlsx"
    );
  }
}
