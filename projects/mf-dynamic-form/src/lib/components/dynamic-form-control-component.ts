import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormComponent} from '../../public-api';
import {DateUtils} from '../utils/date-utils';

@Directive()
export abstract class DynamicFormControlComponent {
  @Output()
  output: EventEmitter<any> = new EventEmitter();
  @Input()
  formValue: FormGroup;
  @Input()
  formReadOnly: boolean;
  @Input()
  dynamicFormRoot: DynamicFormComponent; //TODO delete this and pass by FormAPI instead

  protected updateFormControlValue(value, options?) {
    this.output.emit({value, options});
  }

  /**
   * Get form value
   * @protected
   */
  protected getFormRawValue() {
    const form = {};
    this.dynamicFormRoot.formControls.forEach(it => {

      const visibleCondition = !!this.dynamicFormRoot.exportHiddenFields || it.visible;
      const disableCondition = !!this.dynamicFormRoot.exportDisabledFields || !this.dynamicFormRoot.formGroup.controls[it.key].disabled;
      if (it.exportOnly || (it.export && visibleCondition && disableCondition)) {
        let value = this.dynamicFormRoot.formGroup.controls[it.key].value;
        if (it.controlType == 'date' && it.timeZone && value) {
          value = DateUtils.getIsoDate(value + it.timeZone);
        }
        form[it.key] = value == "" ? null : value;
      }
    });
    return form;
  }
}
