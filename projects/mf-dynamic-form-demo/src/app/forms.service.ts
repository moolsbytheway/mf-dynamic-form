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
          label: 'Selectionnez les choix applicables',
          value: ['2', '1'],
          options: [
            {label: 'Choix1', value: '1'},
            {label: 'Choix2', value: '2'},
            {label: 'Choix3', value: '3'}
          ]
        }),
        new DropdownFormControl({
          step: 'Informations voyageur',
          key: 'motif',
          label: 'Motif',
          value: 'OTHER',
          options: [
            {label: 'Voyage', value: 'VOYAGE'},
            {label: 'Décès', value: 'DEATH'},
            {label: 'Suspect', value: 'SUSPECT'},
            {label: 'Autre', value: 'OTHER'},
          ]
        }),
        new DateFormControl({
            step: 'Informations voyageur',
            key: 'dateRdv',
            label: 'Rendez-vous',
            type: 'datetime-local',
          },
          {
            minDate: formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en'),
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
        new DateFormControl({
            step: 'Informations voyageur',
            key: 'travelDate',
            required: false,
            visibleWhen: [{field: 'motif', value: 'VOYAGE'}],
            requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
            label: 'Date de départ',
            type: 'datetime-local',
          },
          {
            minDate: formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en'),
          }),
        new DropdownFormControl({
          step: 'Informations voyageur',
          key: 'airline',
          required: false,
          visibleWhen: [{field: 'motif', value: 'VOYAGE'}],
          requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
          label: 'Compagnie aérienne',
          value: 'Autres',
          options: [
            {label: 'Mauritanie Airlines', value: 'Mauritanie Airlines'},
            {label: 'Royale Air Maroc', value: 'Royale Air Maroc'},
            {label: 'Tunis Air', value: 'Tunis Air'},
            {label: 'Air France', value: 'Air France'},
            {label: 'Binter', value: 'Binter'},
            {label: 'Air Iberia', value: 'Air Iberia'},
            {label: 'Air Sénégal', value: 'Air Sénégal'},
            {label: 'Air Algérie', value: 'Air Algérie'},
            {label: 'Autres', value: 'Autres'},
          ]
        }),
        new CountryFormControl({
          step: 'Informations voyageur',
          key: 'destination',
          visibleWhen: [{field: 'motif', value: 'VOYAGE'}],
          requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
          label: 'Pays de destination',
          required: false
        }),
        new FileFormControl({
          step: 'Informations voyageur',
          key: 'ticketB64',
          visibleWhen: [{field: 'motif', value: 'VOYAGE'}],
          requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
          label: 'Billet',
          required: false
        }),
        new FileFormControl({
          step: 'Informations voyageur',
          key: 'passportB64',
          visibleWhen: [{field: 'motif', value: 'VOYAGE'}],
          requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
          label: 'Passport',
          required: false
        }),
        new TextboxFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'nni',
          label: 'NNI',
          required: false,
          type: 'number',
          maxLength: 10,
          minLength: 10
        }),
        new DateFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'piValidity',
          requiredWhen: ['nni'],
          label: 'Expiration de la carte d\'identité',
          required: false,
          type: 'date'
        }, {minDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')}),
        new TextboxFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'residenceTitle',
          label: 'Titre de séjour',
          required: false,
          type: 'text',
        }),
        new DateFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'sejourValidity',
          requiredWhen: ['residenceTitle'],
          label: 'Expiration du titre de séjour',
          required: false,
          type: 'date'
        }, {minDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')}),
        new TextboxFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'passportNumbers',
          label: 'Passport',
          requiredWhen: [{field: 'motif', value: 'VOYAGE'}],
          required: false,
          maxLength: 9,
          alphanumeric: true,
          minLength: 9,
          type: 'text',
        }),
        new DateFormControl({
          step: 'Validité des pièces d\'identité',
          key: 'passportValidity',
          requiredWhen: ['passportNumbers'],
          label: 'Expiration du passport',
          required: false,
          type: 'date'
        }, {minDate: formatDate(new Date(), 'yyyy-MM-dd', 'en')}),
      ]
    };
  }

}
