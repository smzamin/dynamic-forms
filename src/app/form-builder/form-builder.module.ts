import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilderComponent } from './form-builder.component';
import { FieldCreatorComponent } from './components/field-creator/field-creator.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FieldCreatorComponent,
    FieldListComponent,
    FormPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormBuilderComponent]
})
export class FormBuilderModule { }