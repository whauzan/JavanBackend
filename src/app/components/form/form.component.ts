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
  @Input() Type: "assets" | "configurations" | "spareparts" = "assets";
  @Input() Method: string = "";
  @Input() DialogRef!: MatDialogRef<DialogComponent>;
  constructor(private service: RestapiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.DialogRef.afterClosed().subscribe(() => {
      this.Form.reset();
    });
  }

  Submit() {
    const dataForm: Asset | Sparepart | Configuration = this.Form.value;
    dataForm["created_at"] = Date.now().toString();

    switch (this.Method) {
      case "Post":
        this.service.postData(dataForm, this.Type).subscribe(() => {
          this.DialogRef.close();
          window.location.reload();
        });
        break;
      case "Put":
        this.service
          .putData(dataForm, this.Type, dataForm["id"])
          .subscribe(() => {
            this.DialogRef.close();
            window.location.reload();
          });
        break;
      default:
        break;
    }
  }

  CheckTypeSelect(type: string) {
    return type == "select";
  }

  SelectValueConvert(selectData: any) {
    const selected = selectData["options"].find(
      (item: { value: any }) => item.value == selectData.value
    );
    return selected["label"];
  }

  OnEdit() {
    this.Method = "Put";
    for (const element of this.FormModel) {
      this.Form.get(element["data"]).setValue(element["value"]);
    }
  }

  onDelete() {
    const dataForm: {
      label: string;
      data: string;
      type: string;
      value: string | number;
      options?: { label: string; value: string }[];
    }[] = this.FormModel;

    this.service.deleteData(this.Type, dataForm[0].value).subscribe(() => {
      this.DialogRef.close();
      window.location.reload();
    });
  }
}
