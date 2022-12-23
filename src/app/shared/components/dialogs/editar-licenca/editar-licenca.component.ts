import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicencaResponse } from 'src/app/shared/models/responses/LicencaResponse';

@Component({
  selector: 'app-editar-licenca',
  templateUrl: './editar-licenca.component.html',
  styleUrls: ['./editar-licenca.component.scss']
})
export class EditarLicencaComponent {
  licencaRecebida = Object.assign(LicencaResponse, this.data.licenca) as LicencaResponse;

  constructor(
    private dialogRef: MatDialogRef<EditarLicencaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { licenca: LicencaResponse },
  ) { }
}
