import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

export class Security {
  public static set(user: Usuario, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem(environment.glUser, btoa(data));
    localStorage.setItem(environment.glToken, token);
  }

  public static setUser(user: Usuario) {
    const data = JSON.stringify(user);

    localStorage.setItem(environment.glUser, btoa(data));
  }

  public static setToken = (token: string) => localStorage.setItem(environment.glToken, token);

  public static getUser(): Usuario {
    const data = localStorage.getItem(environment.glUser);

    if (data)
      return JSON.parse(atob(data));
    else
      return null as any;
  }

  public static getToken(): string {
    const data = localStorage.getItem(environment.glToken);

    if (data)
      return data;
    else
      return null as any;
  }

  public static hasToken(): boolean {
    if (this.getToken())
      return true;
    else
      return false;
  }

  // public static isInRole(roles: Role[]): boolean {
  //    const user = this.getUser();

  //    if (!user)
  //       return false;

  //    return roles.indexOf(user.roleId) >= 0;
  // }

  public static clear() {
    localStorage.removeItem(environment.glUser);
    localStorage.removeItem(environment.glToken);
  }
}
