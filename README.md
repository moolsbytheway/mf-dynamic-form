## Dynamic form (Wrapper around Angular Reactive forms)

### NOTE: THIS IS STILL UNDER ACTIVE DEVELOPPEMENT

#### Contact me at moolsbytheway [at] gmail [dot] com for contribution or assistance

### Roadmap

- Documentation
- Drop dependency for ng-dnamic-component, support dynamic-components natively
- re-design how the stepper is implemented

### Demo (v1)

https://moolsbytheway.github.io/mf-dynamic-form

### Install

NPM package: https://www.npmjs.com/package/mf-dynamic-form

```
npm install mf-dynamic-form
```

# Version 2.x

### Usage example

### Template

```html
<h3>Form</h3>
<div class="container">
  <div>
    <mf-dynamic-form [form]="form"
                     [i18n]="i18n"
                     (formSubmitted)="onSubmit($event)"
    ></mf-dynamic-form>

  </div>
  <pre *ngIf="formData">
    {{  formData | json}}
  </pre>
</div>
```

### TS

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  i18n = {
    next: 'Suivant',
    cancel: 'Annuler',
    previous: 'Précedent',
    save: 'Enregistrer',
    errors: {
      isRequired: 'Ce champs est obligatoire ',
      minLength: 'La longueur minimal est de',
      maxLength: 'La longueur maximal est de',
      emailInvalid: 'Email invalid',
      alphanumeric: 'Ce champs doit être Alphanumeric',
      passwordMismatch: 'Les mots de passe ne sont pas identiques'
    }
  };

  form: MfForm = {
    // @ts-ignore
    customControls: {
      unitsFormControl: ExempleCustomFormControlComponent
    },
    steps: [
      {
        label: 'Informations de la commande',
        iconClass: 'fa fa-truck',
        sections: [
          {
            label: 'Informations de la commande',
            controls: [
              new TextboxFormControl({
                key: 'firstName',
                label: 'Prénom',
                value: 'Moulaye',
                onChanged: (value, patchValue) => {
                  console.log("new firstName: " + value)
                  patchValue("calculatedValue", Math.random())
                },
                type: TextBoxType.TEXT,
              }),
              new TextboxFormControl({
                key: 'calculatedValue',
                label: 'calculatedValue',
                onChanged: (value) => {
                  console.log("new calculatedValue: " + value)
                },
              }),
              new TextboxFormControl({
                key: 'lastName',
                label: 'Nom',
                type: TextBoxType.TEXT
              }),
              new DropdownFormControl({
                key: 'modeTransport',
                label: 'Mode de transport',
                options: [
                  {label: 'Val1', value: 1},
                  {label: 'Val2', value: 2},
                ]
              }),
              new DropdownFormControl({
                key: 'typeFluxWithTriggerField',
                label: 'Type de flux with Trigger field',
                options$: {
                  triggerField: 'modeTransport',
                  callback: fetchTypeFlux$
                }
              }),
              new DropdownFormControl({
                key: 'typeFluxWithoutTriggerField',
                label: 'Type de flux without Trigger field',
                options$: {
                  callback: (value) => {
                    return new Promise((resolve) => {
                      resolve([
                        {label: 'NO trigger Backend value 1', value: 11},
                        {label: 'NO trigger Backend value 2', value: 22},
                      ])
                    })
                  }
                }
              }),
              new DateFormControl(
              {
                key: 'birthDate',
                label: 'Date de naissance',
                value: "2021-12-23T16:21+02:00",
              },
              {
                minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
                maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
                timeZone: "+01:00",
              }),
            ]
          },
        ]
      }, {
        label: 'Informations transport & logistiques',
        sections: [
          {
            label: 'Informations transport & logistiques',
            controls: [
              new TextboxFormControl({
                key: 'info',
                label: 'Commande No',
                type: TextBoxType.NUMBER,
                visibleWhen: [new KeyValueConditionMatcher('firstName', "Moulaye", "EQUALS")],
              }),
            ]
          },
        ]
      }, {
        label: 'Références',
        sections: [
          {
            label: 'Références',
            controls: [
              new TextboxFormControl({
                key: 'sap',
                label: 'SAP No',
                type: TextBoxType.NUMBER,
              }),
            ]
          },
        ]
      }, {
        label: 'Articles',
        sections: [
          {
            label: 'Articles',
            controls: [
              new DynamicFormControl({
                key: 'units',
                component: 'unitsFormControl',
                inputs: {
                  a: 1,
                  b: 2
                }
              }),
            ]
          },
        ]
      }
    ]
  };

  formData: any;

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
```

### Exemple custom form control

```typescript

@Component({
  selector: 'app-units',
  template: `
		<div style="border: 1px dashed gray">
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
```

### Additonal `visibleWhen`, `requiredWhen`, `disabledWhen` matchers to use with

- Key-value matcher https://github.com/moolsbytheway/mfx-key-value-matcher
- Field presence matcher https://github.com/moolsbytheway/mfx-field-presence-matcher
- Advanced condition expression matcher https://github.com/moolsbytheway/mfx-advanced-condition-matcher



