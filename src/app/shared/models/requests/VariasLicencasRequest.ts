import { LicencaResponse } from "../responses/LicencaResponse";

export class VariasLicencasRequest {
  validade!: Date | string;
  licencas!: LicencaResponse[];
}
