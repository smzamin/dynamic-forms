import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldType, FormField } from '../../types/form.types';

@Component({
  selector: 'app-field-creator',
  templateUrl: './field-creator.component.html',
})
export class FieldCreatorComponent {
  field: FormField = this.getEmptyField();
  options: string[] = [];
  @Input() showValidation = false;
  @Output() fieldCreated = new EventEmitter<FormField>();

  get isMultiOptionField(): boolean {
    return ['radio', 'checkbox'].includes(this.field.type);
  }

  private getEmptyField(): FormField {
    return {
      id: '',
      type: 'text' as FieldType,
      label: '',
      required: false,
    };
  }

  addOption(): void {
    this.options.push('');
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
  }

  createField(): void {
    if (!this.field.label) {
      return;
    }

    if (this.isMultiOptionField) {
      const validOptions = this.options.filter((opt) => opt.trim());
      if (validOptions.length === 0) {
        return;
      }
      this.field.options = [...validOptions];

      if (this.field.type === 'checkbox') {
        this.field.value = {};
        validOptions.forEach((opt) => {
          this.field.value[opt] = false;
        });
      }
    }

    const newField = {
      ...this.field,
      id: crypto.randomUUID(),
    };
    this.fieldCreated.emit(newField);

    this.field = this.getEmptyField();
    this.options = [];
  }
}
