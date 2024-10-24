import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss'],
})
export class DirectorDetailsComponent {
  movie: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string; Bio: string; Birth: string; Death: string },
    public dialogRef: MatDialogRef<DirectorDetailsComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
