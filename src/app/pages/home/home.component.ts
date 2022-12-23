import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { BehaviorSubject } from 'rxjs';
import { LicencasService } from 'src/app/core/services/licencas.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AdicionarLicencaComponent } from 'src/app/shared/components/dialogs/adicionar-licenca/adicionar-licenca.component';
import { ConfirmarAtualizarVariosComponent } from 'src/app/shared/components/dialogs/confirmar-atualizar-varios/confirmar-atualizar-varios.component';
import { EditarLicencaComponent } from 'src/app/shared/components/dialogs/editar-licenca/editar-licenca.component';
import { LicencaRequest } from 'src/app/shared/models/requests/LicencaRequest';
import { LicencaResponse } from 'src/app/shared/models/responses/LicencaResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  private wasChanged = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = ['cliente', 'cnpj', 'validade', 'areaEditar', 'areaAtualizar', 'areaBloquear'];
  dataSource!: MatTableDataSource<LicencaResponse>;

  @ViewChild(MatTable) table!: MatTable<LicencaResponse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileImportInput') fileImportInput: any;

  private licencas = [] as LicencaResponse[];

  constructor(
    private licencasService: LicencasService,
    private utilsService: UtilsService,
    private ngxCsvParser: NgxCsvParser,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    await this.load();

    this.wasChanged.subscribe(async changed => changed ? await this.load() : '');
  }

  private async load() {
    await this.licencasService.getAll()
      .toPromise()
      .then(response => this.licencas = response.data);

    this.dataSource = new MatTableDataSource(this.licencas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.replace(/[^\w\s]/gi, '').trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  modalEditarLicenca(licenca: LicencaResponse) {
    const dialogRef = this.utilsService.instanciarModal(EditarLicencaComponent, { data: { licenca }, position: { top: '30px' } });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.updateLicenca(result);
    });
  }

  modalAdicionarLicenca() {
    const dialogRef = this.utilsService.instanciarModal(AdicionarLicencaComponent, { width: '350px', position: { top: '30px' } });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.licencasService
        .create(result)
        .subscribe((response) => this.updateGrid(response.data));
    });
  }

  atualizarValidade(licenca: LicencaResponse, bloquear: boolean = false) {
    const validade = new Date(licenca.validade!.toString());
    const ano = validade.getFullYear();
    const mes = bloquear ? validade.getMonth() - 1 : validade.getMonth() + 1;
    const dia = 15;

    const validadeAtual = new Date(ano, mes, dia).toISOString().slice(0, 10);
    licenca.validade = validadeAtual;

    this.updateLicenca(licenca);
  }

  private updateLicenca(licenca: LicencaResponse) {
    this.licencasService
      .update(licenca.codigo, { cnpj: licenca.cnpj, codigo: licenca.codigo, validade: licenca.validade, codPai: licenca.codPai } as LicencaRequest)
      .subscribe((response) => this.updateGrid(response.data));
  }

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    this.ngxCsvParser
      .parse(files[0], {
        header: true,
        delimiter: ';',
        encoding: 'utf8'
      })
      .pipe()
      .subscribe(
        (listaCSV: any) => {
          const dialogRef = this.utilsService.instanciarModal(ConfirmarAtualizarVariosComponent, { position: { top: '30px' } });

          dialogRef.afterClosed().subscribe(dialogResult => {
            if (!dialogResult) return;

            const licencasRequest: LicencaResponse[] = [];

            listaCSV.forEach((element: { Nome: string, Documento: string }) => {
              let licenca = new LicencaResponse();

              const cnpj = element.Documento.replace(/[^\w\s]/gi, '').trim();

              const jaExiste = licencasRequest.find(l => l.cnpj.includes(cnpj)) !== undefined;

              if (jaExiste) return

              const licencaExistente = this.licencas.find(l => l.cnpj.includes(cnpj));

              if (!licencaExistente) return;

              licenca = licencaExistente;

              licencasRequest.push(licenca);
            });

            this.licencasService
              .atualizarVariasLicencas({ licencas: licencasRequest, validade: dialogResult })
              .subscribe(() => this.wasChanged.next(true));
          });
        }, (error: NgxCSVParserError) => console.log('Error', error));
  }

  private updateGrid(licencas: LicencaRequest[]) {
    licencas.forEach(licenca => {
      const licencaAntiga = this.licencas.find(l => l.codigo == licenca.codigo)!;
      licencaAntiga.validade = licenca.validade;
    });

    this.refreshTable();
  }

  private refreshTable = () => this.table.renderRows();
}
