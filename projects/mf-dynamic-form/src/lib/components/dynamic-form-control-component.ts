import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { DynamicFormComponent } from '../../public-api';

@Directive()
export abstract class DynamicFormControlComponent {
	@Output()
	output: EventEmitter<any> = new EventEmitter();
	@Input()
  formValue: FormGroup
  @Input()
  formReadOnly: boolean
  @Input()
  dynamicFormRoot: DynamicFormComponent; //TODO delete this and pass by FormAPI instead

	protected updateFormControlValue(value, options?) {
		this.output.emit({value, options})
	}
}
