import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domeins: string[]): ValidatorFn {
  const domainStrings = domeins.join('|');
  const regExp = new RegExp(`[a-z0-9]{6,}@gmail\.(${domainStrings})$`);

  return (control) => {

    // test
    const x = control.value
    const z = regExp.test(control.value)

    return control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
