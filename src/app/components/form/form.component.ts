import { Component, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Asset } from "src/app/service/model/Asset";
import { Configuration } from "src/app/service/model/Configuration";
import { Sparepart } from "src/app/service/model/Sparepart";
import { RestapiService } from "src/app/service/restapi.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
  @Input() FormModel: {
    label: string;
    data: string;
    type: string;
    value: string | number;
    options?: { label: string; value: string }[];
  }[] = [];
  @Input() Form: any;
  @Input() Data: string = "";
  @Input() DialogRef!: MatDialogRef<DialogComponent>;
  constructor(private service: RestapiService) {}

  ngOnInit(): void {
    console.log(this.Data);
    
  }

  Submit() {
    const data: Asset | Sparepart | Configuration = this.Form.value;
    data["created_at"] = Date.now().toString();

    switch (this.Data) {
      case "Asset":
        this.Data = "assets";
        break;
      case "Sparepart":
        this.Data = "spareparts";
        break;
      case "Configuration":
        this.Data = "configurations";
        break;
      default:
        break;
    }

    this.service.postData(data, this.Data).subscribe(() => {
      this.DialogRef.close();
      window.location.reload();
    });
  }

  CheckTypeSelect(type: string) {
    return type == "select";
  }
}
