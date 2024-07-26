import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  
  /**
   * form validation, checks for forbidden characters
   * @returns 
   */
  forbiddenCharactersValidator(): ValidatorFn {
    const forbidden = /<script>|<\/script>/i;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbiddenChar = forbidden.test(control.value);
      return forbiddenChar ? { 'forbiddenCharacters': { value: control.value } } : null;
    };
  }
}