import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField } from '../../types/form.types';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
})
export class FormPreviewComponent {
  @Input() fields: FormField[] = [];
  @Output() submit = new EventEmitter<void>();
  @Output() export = new EventEmitter<void>();

  onSubmit(): void {
    this.submit.emit();
  }
}
