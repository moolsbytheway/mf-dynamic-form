## Dynamic form component

#### Contact me at moolsbytheway [at] gmail [dot] com for contribution or assistance
### Roadmap
- Add required attribute to checkboxes
- Add pattern validation
- add ios like switcher control
- add the support for custom controls (so anyone can create a control and use it in the form)
- re-design how the stepper is implemented
- show an error message if some required inputs are missing if user clicks on save (enable save button by default)

### Demo

https://moolsbytheway.github.io/mf-dynamic-form

### Stackblitz
[Not working right now]
https://stackblitz.com/edit/angular-ivy-2s2tth

### Install

NPM package: https://www.npmjs.com/package/mf-dynamic-form

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
  i18n= {next:'Suivant', cancel: 'Annuler', previous: 'Précedent', save: 'Enregistrer'}
  form: MfForm  = {
    debugMode: true,
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
          value: new Date()
        },
        {
          minDate: formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
          maxDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')
        }),
      new RadioButtonFormControl({
        step: 'Informations voyageur',
        key: 'radioButton',
        label: 'Acceptes tu les termes et conditions ?',
        value: '',
        options: [
          {label: 'Oui', value: 'true'},
          {label: 'Non', value: 'false'}
        ]
      }),
      new CheckboxFormControl({
        step: 'Informations voyageur',
        key: 'checkboxes',
        required: true,
        class: 'col-xl-12',
        label: 'Selectionnez les choix applicables',
        value: ['2', '1'],
        options: [
          {label: 'Choix1', value: '1'},
          {label: 'Choix2', value: '2'},
          {label: 'Choix3', value: '3'}
        ]
      }),
      new CountryFormControl({
        step: 'Informations de l\'utilisateur',
        key: 'birthPlace',
        label: 'Lieu de naissance',
      }),
      new TextareaFormControl({
        step: 'Informations voyageur',
        key: 'motifDescription',
        label: 'Description du motif'
      }),
      new PasswordFormControl({
        step: 'Informations de l\'utilisateur',
        key: 'password',
        label: 'Mot de passe',
        type: 'password',
        minLength: 6
      }),
      new PasswordFormControl({
        step: 'Informations de l\'utilisateur',
        key: 'passwordConfirmation',
        export: false,
        label: 'Confirmation',
        placeholder: 'Confirmation MDP',
        requiredWhen: ['password'],
        type: 'password',
        minLength: 6
      }),
      new FileFormControl({
        step: 'Informations voyageur',
        key: 'ticketB64',
        label: 'Billet',
        required: false
      }),
    ]
  };

  formData: any;

  onSubmit(formData: any) {
    this.formData = formData;
  }
}
```

### Example `onSubmit` Output

```json
 {
  "firstName": "Moulaye Abderrahmane",
  "phone": "33434343",
  "genre": "HOMME",
  "birthDate": "2021-03-05",
  "radioButton": "true",
  "checkboxes": [
    "2"
  ],
  "birthPlace": "fdsfds",
  "motifDescription": "fdsf",
  "password": "adminad",
  "ticketB64": ""
}
```
