import { UsuarioFuncao } from "./UsuarioFuncao";

export class Usuario {
  Codigo!: number;
  CodigoIdentificacao!: number;
  Nome!: string;
  CodPessoa!: string;
  Senha!: string;
  DescontoMax!: number | null;
  Comissao!: number | null;
  CadUsuario!: boolean;
  BloqueiaCancelaProd!: boolean;
  CodigoFuncao!: number;
  CodigoEmpresa!: number | null;
  MovimentaEstoqueES!: boolean;
  VerQuantiaCaixa!: boolean;
  devolverProduto!: boolean;
  PDV_EstornarRecbto!: boolean;
  PDV_CancelarPedido!: boolean;
  PDV_PermitirOutrasSaidas!: boolean;
  PDV_ModificarDescontoSistema!: boolean;
  PDV_PermitirTransfProduto!: boolean;
  PDV_CriarOrcamento!: boolean;
  Ret_VerCusto!: boolean;
  Ret_AlteraTabPreco!: boolean;
  AcessaFinanceiro!: boolean;
  AlteraProduto!: boolean;
  PDV_PermitirVendaClienteComTituloAtrasado!: boolean;
  PDV_PermitirVendaClienteSemLimiteCredito!: boolean;
  Meta!: number;
  OperadorCaixa!: boolean;
  AcessarRetaguarda!: boolean | null;
  PDV_PermitirVendaComEstoqueNegativo!: boolean;
  Funcao!: UsuarioFuncao;
}
