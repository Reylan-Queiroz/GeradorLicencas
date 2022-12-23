import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateRequest } from 'src/app/shared/models/requests/AuthenticateRequest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient
  ) { }

  authenticate = (authenticateRequest: AuthenticateRequest) => this.httpClient.post(environment.endpoint_api + '/Auth/loginEmpresa', authenticateRequest);
}
