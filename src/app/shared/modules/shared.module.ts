/* Angular */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Application modules */
import { PipesModule } from './pipes.module';

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SharedModule { }
