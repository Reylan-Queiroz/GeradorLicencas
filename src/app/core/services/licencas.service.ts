import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VariasLicencasRequest } from 'src/app/shared/models/requests/VariasLicencasRequest';
import { environment } from 'src/environments/environment';
import { CrudService } from './crudService.service';

@Injectable({
  providedIn: 'root'
})
export class LicencasService extends CrudService<any, number> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.endpoint_api}/licencas`);
  }

  atualizarVariasLicencas = (request: VariasLicencasRequest) => this._http.post(`${this._base}/AtualizarVariasLicencas`, request);
}
