import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { SingleSelectSearchModule } from './components/select/single-select-search/single-select-search.module';
import { SingleSelectSearchWngxModule } from './components/select/single-select-search-wngx/single-select-search-wngx.module';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SingleSelectSearchModule,
    BrowserAnimationsModule,
    MatCardModule,
    SingleSelectSearchWngxModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
