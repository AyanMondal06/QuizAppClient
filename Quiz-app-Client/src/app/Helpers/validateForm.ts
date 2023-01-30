import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm {

  static validateAllFormFields(formGrop: FormGroup) {
    Object.keys(formGrop.controls).forEach(field => {
      const control = formGrop.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}

