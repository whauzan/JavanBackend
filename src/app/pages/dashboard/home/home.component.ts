import { Component, OnInit } from "@angular/core";
import { RestapiService } from "src/app/service/restapi.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  constructor(private service: RestapiService) {}

  history: any;
  dataTable: any;
  headArray = [
    {
      label: "Time",
      data: "created_at",
    },
    {
      label: "Title",
      data: "title",
    },
    {
      label: "User",
      data: "userfullname",
    },
    {
      label: "Detail",
      data: "details",
    },
  ];

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
    });
  }

  OnSearch(value: string) {
    if (value != "") {
      this.dataTable = this.history.filter((item: any) => {
        return item.userfullname.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      this.dataTable = this.history;
    }
  }
}
