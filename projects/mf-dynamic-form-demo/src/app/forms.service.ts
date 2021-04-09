import {Injectable} from '@angular/core';
import {TextboxFormControl} from '../../../mf-dynamic-form/src/lib/df-model/textbox-form-control';
import {DropdownFormControl} from '../../../mf-dynamic-form/src/lib/df-model/dropdown-form-control';
import {DateFormControl} from '../../../mf-dynamic-form/src/lib/df-model/date-form-control';
import {formatDate} from '@angular/common';
import {CountryFormControl} from '../../../mf-dynamic-form/src/lib/df-model/country-form-control';
import {TextareaFormControl} from '../../../mf-dynamic-form/src/lib/df-model/textarea-form-control';
import {PasswordFormControl} from '../../../mf-dynamic-form/src/lib/df-model/password-form-control';
import {FileFormControl} from '../../../mf-dynamic-form/src/lib/df-model/file-form-control';
import {RadioButtonFormControl} from '../../../mf-dynamic-form/src/lib/df-model/radio-button-form-control';
import {CheckboxFormControl} from '../../../mf-dynamic-form/src/lib/df-model/checkbox-form-control';

@Injectable()
export class FormsService {


  static getRegisterForm() {
    return {
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
          label: 'Lieu de naissance'
        }, {
          i18n: {
            cityIsMissing: 'I cant\'t see the desired city',
            city: "City",
            state: "State",
            country: "Country"
          }
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
  }

}
