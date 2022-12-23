import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPessoa } from 'src/app/shared/enums/tipoPessoa.enum';
import { environment } from 'src/environments/environment';
import { CrudService } from './crudService.service';

@Injectable({
  providedIn: 'root'
})
export class PessoasService extends CrudService<any, number> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.endpoint_api}/Pessoas`);
  }

  getAllTipoCadPessoa = () => this._http.get(`${this._base}/Tipos`);

  getByCpf = (cpf: string) => this._http.get(`${this._base}/cpf/${cpf}`);

  getByCnpj = (cnpj: string) => this._http.get(`${this._base}/cnpj/${cnpj}`);

  getAllByTipoPessoa = (tipoPessoa: TipoPessoa) => this._http.get(`${this._base}/tipoPessoa/${tipoPessoa}`);
}
