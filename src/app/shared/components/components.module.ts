import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { AdicionarLicencaComponent } from './dialogs/adicionar-licenca/adicionar-licenca.component';
import { ConfirmarAtualizarVariosComponent } from './dialogs/confirmar-atualizar-varios/confirmar-atualizar-varios.component';
import { EditarLicencaComponent } from './dialogs/editar-licenca/editar-licenca.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [
    EditarLicencaComponent,
    ConfirmarAtualizarVariosComponent,
    AdicionarLicencaComponent
  ],
  exports: [
    EditarLicencaComponent,
    ConfirmarAtualizarVariosComponent,
    AdicionarLicencaComponent
  ]
})
export class ComponentsModule { }

