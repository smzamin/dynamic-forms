import { Injectable } from '@angular/core';
import { FormData } from '../types/form.types';

@Injectable({
  providedIn: 'root',
})
// Service for handling form data persistence
export class StorageService {
  private static readonly STORAGE_KEY = 'formBuilder';

  // Load form data from localStorage
  static loadForm(): FormData | null {
    const savedForm = localStorage.getItem(this.STORAGE_KEY);
    return savedForm ? JSON.parse(savedForm) : null;
  }

  // Save form data to localStorage
  static saveForm(formData: FormData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData));
  }
}
