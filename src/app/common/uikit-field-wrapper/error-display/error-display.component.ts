import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-uikit-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
})
export class ErrorDisplayComponent {
  @Input() errorMessages: string[] | undefined;
}
