import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Security } from 'src/app/shared/utils/security.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _toastrService: ToastrService
  ) { }

  canActivate() {
    const token = Security.getToken();

    if (!token) {
      this._toastrService.warning('Autentique-se!', '', environment.toastrConfig);

      this._router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
