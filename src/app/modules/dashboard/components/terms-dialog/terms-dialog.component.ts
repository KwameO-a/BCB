import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "src/environments/environment";

export interface ApproveDialogData {
  type: string;
}

@Component({
  selector: "app-terms-dialog",
  templateUrl: "./terms-dialog.component.html",
  styleUrls: ["./terms-dialog.component.scss"]
})
export class TermsDialogComponent implements OnInit {
  src = "";

  assetUrl = environment.assetsUrl;
  constructor(
    public dialogRef: MatDialogRef<TermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApproveDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.type === "terms") {
      this.src = this.assetUrl+ "/assets/files/Terms.pdf";
    } else {
      this.src = this.assetUrl+ "/assets/files/Declaration.pdf";
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
