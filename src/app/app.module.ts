import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UikitFieldWrapperComponent } from './common/uikit-field-wrapper/uikit-field-wrapper.component';
import { UikitDatePickerComponent } from './common/uikit-date-picker/uikit-date-picker.component';
import { ErrorDisplayComponent } from './common/uikit-field-wrapper/error-display/error-display.component';

@NgModule({
  declarations: [
    AppComponent,
    UikitFieldWrapperComponent,
    ErrorDisplayComponent,
    UikitDatePickerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
