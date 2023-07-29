import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEmailValidator } from './app-email-validator';

@Directive({
  selector: '[appEmail]',

  // set NG_VALIDATORS
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      // all errors
      multi:true  
      // -----------
      
    }
  ]
})



export class EmailDirective implements Validator, OnChanges {
  @Input() appEmail: string[] = []

  // test
  //  po defolt vryshta null function 
  validator: ValidatorFn = () => null
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const emailChanges = changes['appEmail'];

    if(emailChanges){
      this.validator = appEmailValidator(emailChanges.currentValue)
    }
  }
}
