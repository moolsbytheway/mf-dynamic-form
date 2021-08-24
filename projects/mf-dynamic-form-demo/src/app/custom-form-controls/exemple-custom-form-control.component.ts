import {Component, Input} from "@angular/core";
import {DynamicFormControlComponent} from '../../../../mf-dynamic-form/src/lib/components/dynamic-form-control-component';


@Component({
	selector: 'app-units',
	template: `
		<div style="border: 1px dashed gray">
      <small>READONLY: {{!!formReadyOnly}}</small>
			<p>Units dynamic component , params: a = {{a}} , b = {{b}}</p>
			<label>this is a custom input component<input type="text" (change)="updateInput($event)"/></label>
			<button class="btn btn-primary" (click)="update($event)">save units</button>
		</div>
	`
})
export class ExempleCustomFormControlComponent extends DynamicFormControlComponent {

	@Input()
	a: number;
	@Input()
	b: number;

	value: string;

	updateInput(event) {
		this.value = event.target.value;
	}

	update($event) {
		this.updateFormControlValue(this.value)
	}
}
