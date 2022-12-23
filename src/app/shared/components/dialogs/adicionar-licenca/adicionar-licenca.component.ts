import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PessoasService } from 'src/app/core/services/pessoas.service';
import { LicencaRequest } from 'src/app/shared/models/requests/LicencaRequest';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adicionar-licenca',
  templateUrl: './adicionar-licenca.component.html',
  styleUrls: ['./adicionar-licenca.component.scss']
})
export class AdicionarLicencaComponent {
  novaLicenca: LicencaRequest = new LicencaRequest();
  nome: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<AdicionarLicencaComponent>,
    private pessoasService: PessoasService,
    private toastr: ToastrService
  ) { }

  buscarPessoa(cnpj: string) {
    cnpj = cnpj.replace(/[^\w\s]/gi, '').trim();

    this.nome = null;

    if (cnpj.length != 14) return;

    this.pessoasService
      .getByCnpj(cnpj)
      .subscribe(
        (response: any) => {
          if (!response.success || !response.data) {
            this.toastr.error('CNPJ não encontrado na tabela Pessoas.', '', environment.toastrConfig);

            return;
          }

          this.nome = response.data?.nome;
        }
      );
  }
}
