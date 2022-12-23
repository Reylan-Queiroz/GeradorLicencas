import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   constructor(
      private matDialog: MatDialog
   ) { }

   instanciarModal = (component: ComponentType<unknown>, config: MatDialogConfig | undefined) => this.matDialog.open(component, config);
}
