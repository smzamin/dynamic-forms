import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField } from '../../types/form.types';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
})
export class FieldListComponent {
  @Input() fields: FormField[] = [];
  @Output() removeField = new EventEmitter<number>();
  @Output() reorderFields = new EventEmitter<{ from: number; to: number }>();

  isDragging: number | null = null;

  startDrag(index: number): void {
    this.isDragging = index;
  }

  stopDrag(): void {
    this.isDragging = null;
  }

  onDrop(event: any): void {
    if (this.isDragging !== null) {
      this.reorderFields.emit({
        from: this.isDragging,
        to: event.currentIndex,
      });
    }
    this.isDragging = null;
  }
}
