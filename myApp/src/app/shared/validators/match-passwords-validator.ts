import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  pass: string,
  rePass: string
): ValidatorFn {
  return (control) => {
    //test
    console.log(control);

    const group = control as FormGroup;

    const passOne = group.get(pass);
    const passTwo = group.get(rePass);

    return passOne?.value === passTwo?.value
      ? null
      : { matchPasswordValidator: true };
  };
}
