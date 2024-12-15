import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface InputParameter {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

export type IconSizeType = 'none' | 'small' | 'medium' | 'regular' | 'large';

@Component({
  selector: 'app-uikit-field-wrapper',
  templateUrl: './uikit-field-wrapper.component.html',
  styleUrl: './uikit-field-wrapper.component.scss'
})
export class UikitFieldWrapperComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() label?: string;
  @Input() showLabel = true;
  @Input() required = false;
  @Input() readonly = false;
  @Input() tooltip?: string;
  @Input() disabled = false;
  @Input() params: InputParameter | undefined;

  @Input() control?: FormControl;
  @Input() showInfoIcon = false;
  @Input() infoIconTooltip = '';
  @Input() tooltipSize: IconSizeType = 'medium';
  @Input() showUserTag = false;

  @Output() userTagClicked: EventEmitter<boolean> = new EventEmitter();

  errorMessages: string[] = [];
  changeSubscription: Subscription | undefined;
  errorTemplates: Map<string, string> | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.control) {
      this.changeSubscription = this.control.valueChanges.pipe().subscribe(() => {
        this.errorMessages = this.getErrors();
      });
    }
  }

  ngAfterViewChecked() {
    if (this.control && (this.control.dirty || this.control.touched)) {
      this.errorMessages = this.getErrors();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }


  getErrors(): string[] {
    if (this.control && this.control.errors) {
      return ['Value is required']
    }
    return [];
  }

  userTagBtn() {
    this.userTagClicked.emit(true);
  }
}
