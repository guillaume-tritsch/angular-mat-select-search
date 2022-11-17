import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SingleSelectSearchWngxComponent } from './single-select-search-wngx.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  declarations: [SingleSelectSearchWngxComponent],
  exports: [SingleSelectSearchWngxComponent],
})
export class SingleSelectSearchWngxModule {}
