import { Component, OnInit } from '@angular/core';
import { FormField, FormData } from './types/form.types';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit {
  fields: FormField[] = [];
  showValidation = false;

  ngOnInit() {
    const savedForm = StorageService.loadForm();
    if (savedForm) {
      this.fields = savedForm.fields;
    }
  }

  onFieldCreated(field: FormField): void {
    this.fields.push(field);
    this.saveForm();
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
    this.saveForm();
  }

  reorderFields(event: { from: number; to: number }): void {
    const item = this.fields[event.from];
    this.fields.splice(event.from, 1);
    this.fields.splice(event.to, 0, item);
    this.saveForm();
  }

  submitForm(): void {
    const formData = this.fields.map((field) => ({
      label: field.label,
      type: field.type,
      value: field.value,
    }));
    console.log('Form submitted:', formData);
  }

  exportForm(): void {
    const formData = {
      fields: this.fields.map((field) => ({
        ...field,
        value: undefined,
      })),
    };
    this.jsonToCsvDownload(formData.fields);
  }

  private saveForm(): void {
    const formData: FormData = { fields: this.fields };
    StorageService.saveForm(formData);
  }

  jsonToCsv(jsonData: FormField[]): string {
    const headers = Object.keys(jsonData[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    jsonData.forEach((row: any) => {
      const values = headers.map((header) => JSON.stringify(row[header] ?? ''));
      csvRows.push(values.join(','));
    });
    return csvRows.join('\n');
  }

  jsonToCsvDownload(formData: FormField[]) {
    const csvData = this.jsonToCsv(formData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-definition.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
