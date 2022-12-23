import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthenticateRequest } from 'src/app/shared/models/requests/AuthenticateRequest.model';
import { Security } from 'src/app/shared/utils/security.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      login: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])]
    });
  }

  async ngOnInit() {
    if (Security.hasToken()) {
      const user = Security.getUser();
      const token = Security.getToken();

      this._setUser(user, token);
    } else {
      localStorage.clear();
    }
  }

  onSubmit(form: FormGroup) {
    this.authService.authenticate(form.value as AuthenticateRequest).subscribe(
      (data: any) => this._setUser(data.user, data.token),
      () => this.toastr.error('Usuário ou senha inválidos.', '', environment.toastrConfig));
  }

  private _setUser(usuario: any, token: string) {
    Security.set(usuario, token);
    this.router.navigate(['/home']);
  }
}
