import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'loader',
  template: '<ngx-loading [show]="(loading | async)!"></ngx-loading>',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
  ) { }
}
