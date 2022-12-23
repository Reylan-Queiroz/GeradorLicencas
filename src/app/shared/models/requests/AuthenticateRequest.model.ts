export class AuthenticateRequest {
  constructor(
    public login: string,
    public password: string,
    public dataBaseName: string | null
  ) { }
}
