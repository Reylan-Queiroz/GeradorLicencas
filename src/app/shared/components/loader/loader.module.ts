import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop:true
   }),
  ],
  declarations: [
   LoaderComponent
],
exports: [
  LoaderComponent
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoaderModule { }
