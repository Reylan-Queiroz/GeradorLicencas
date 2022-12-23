export class LicencaResponse {
  codigo!: number;
  nomeCliente!: string;
  grupoCliente!: string;
  bomPagador!: boolean;
  cnpj!: string;
  validade!: Date | string | null;
  codPai!: number;
}
