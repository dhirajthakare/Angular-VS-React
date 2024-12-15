import { Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseFormControlValueAccessor } from '../uikit-field-wrapper/base-form-control-value-accessor';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';
import { MatDatepickerInputEvent, MatDateRangePicker } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS,MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-uikit-date-picker',
  templateUrl: './uikit-date-picker.component.html',
  styleUrl: './uikit-date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UikitDatePickerComponent),
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
  ],
})
export class UikitDatePickerComponent extends BaseFormControlValueAccessor implements OnInit {
  isFocused = false;
  control!: FormControl;

  @Input() showLabel = true;
  @Input() dateRange = false;
  @Input() readOnly = true;
  @Input() label = '';
  @Input() required = true;
  @Input() startDate = moment().format('DD-MM-YYYY');
  @Input() endDate = moment().format('DD-MM-YYYY');
  @Input() tooltip?: string;
  @Input() dateFormat!: string;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() customPopoverClass = 'custom-class';
  @Input() id = 0;
  @Output() ngModelChange = new EventEmitter<Date | { start: Date; end: Date }>();

  @ViewChild('rangePicker') dateRangePicker!: MatDateRangePicker<Date>;

  range!: FormGroup;

  private _disabled = false;

  @Input() set isDisabled(value: boolean) {
    this._disabled = value;
    if (this._disabled) {
      this.range.disable();
      this.control?.disable();
    } else {
      this.range.enable();
      this.control?.enable();
    }
  }

  get isDisabled() {
    return this._disabled;
  }

  _ngModel!: Date | { start: string; end: string };
  @Input() set ngModel(value: Date | { start: string; end: string }) {
    this._ngModel = value;
    this.setNgModel();
  }

  constructor(
    private elementRef: ElementRef,
    injector: Injector,
    private formBuilder: FormBuilder,
  ) {
    super(injector);
    this.range = this.formBuilder.group({
      start: [''],
      end: [''],
    });
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.id = this.id;
    if (this.dateFormat) {
      MY_FORMATS.parse.dateInput = this.dateFormat;
      MY_FORMATS.display.dateInput = this.dateFormat;
    }
    this.control = this.formFieldControl;
    this.control.valueChanges.subscribe((value) => {
      if (this.dateRange && value && value.start) {
        this.range.setValue(value);
        this.range.updateValueAndValidity();
      }
    });
    if (this._ngModel) {
      this.setNgModel();
    }
  }

  startDateRangeChange() {
    if (this.control) {
      this.control.setValue(this.range.value);
      this.control.updateValueAndValidity();
    }
  }

  endDateRangeChange() {
    if (this.control) {
      this.control.setValue(this.range.value);
      this.control.updateValueAndValidity();
    }
    this.ngModelChange.emit(this.range.value);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.ngModelChange.emit(event.value ?? undefined);
    this.control.setValue(event.value);
  }

  setNgModel() {
    if (this.dateRange && 'start' in this._ngModel) {
      this.range.setValue(this._ngModel);
      this.range.updateValueAndValidity();
    } else if (this.control) {
      this.control.setValue(this._ngModel);
      this.control.updateValueAndValidity();
    }
  }

  openDateRangePicker() {
    this.dateRangePicker.open();
  }

  onDatePickerOpened() {
    const elem = document.getElementsByClassName('mat-datepicker-popup')[0];
    if (elem) {
      elem.classList.add(this.customPopoverClass);
    }
  }
}

// npm install moment --save   
// npm install @angular/material @angular/cdk @angular/animations date-fns --force
// npm install @angular/material-moment-adapter --save --force      