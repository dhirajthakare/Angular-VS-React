/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Directive, Injector, Input } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl } from '@angular/forms';

@Directive()
export class BaseFormControlValueAccessor implements ControlValueAccessor {
  constructor(private injector: Injector) {}

  @Input() formControl!: FormControl;
  @Input() formControlName!: string;

  get formFieldControl(): FormControl {
    return this.formControl || this.getControlByFieldName() || new FormControl();
  }

  get formFieldDefaultControl(): FormControl | undefined {
    return this.formControl || this.getControlByFieldName() || undefined;
  }

  getControlByFieldName() {
    let fieldControl: FormControl | undefined;
    if (this.formControlName) {
      const frmControl = this.injector.get(ControlContainer)?.control?.get(this.formControlName);
      fieldControl = frmControl ? (frmControl as FormControl) : undefined;
    }
    return fieldControl;
  }

  onValueChange = (value: any) => {};

  onTouch = () => {};

  writeValue(value: any): void {}

  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
