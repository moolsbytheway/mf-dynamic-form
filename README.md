## Dynamic form component

### Contact me at moolsbytheway [at] gmail [dot] com for contribution or assistance
### Roadmap
- Add required attribute to checkboxe
- Add pattern validation
- add ios like switcher control
- add the support for custom controls (so anyone can create a control and use it in the form)
- re-design how the stepper is implemented
- show an error message if some required inputs are missing if user clicks on save (enable save button by default)

### Install

```
npm install mf-dynamic-form
```

### Usage example

### Template
```html
<h3>Formulaire création test COVID19</h3>
<div class="container">
  <div>
    <mf-dynamic-form [form]="form"
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

  form: MfForm  = {
      debugMode: false,
      stepper: true,
      controls: [
        new TextboxFormControl({
          step: 'Informations de l\'utilisateur',
          key: 'firstName',
          label: 'Prénom',
          type: 'text',
        }),
        new TextboxFormControl({
          step: 'Informations de l\'utilisateur',
          key: 'lastName',
          label: 'Nom',
          type: 'text',
        }), new TextboxFormControl({
          step: 'Informations de l\'utilisateur',
          key: 'email',
          label: 'Email',
          type: 'email',
        }),
        new TextboxFormControl({
          step: 'Informations de l\'utilisateur',
          key: 'phone',
          label: 'Téléphone',
          required: false,
          type: 'text',
          maxLength: 8,
          minLength: 8
        }),
        new DropdownFormControl({
          step: 'Informations de l\'utilisateur',
          key: 'genre',
          label: 'Genre',
          value: 'HOMME',
          options: [
            {label: 'Homme', value: 'HOMME'},
            {label: 'Femme', value: 'FEMME'},
          ]
        }),
        new DateFormControl(
          {
            step: 'Informations de l\'utilisateur',
            key: 'birthDate',
            label: 'Date de naissance',
            type: 'date',
          },
          {
            minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
            maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')
          })
        ]
  };

  formData: any;

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
```

