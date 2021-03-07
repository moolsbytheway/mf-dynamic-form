/*
 *
 *  * Copyright (c) 2020. ALIS.
 *  * Proprietary source code; any copy or modification is prohibited.
 *  *
 *  *
 *  *
 *
 */

import {AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ICity, ICountry, IState} from 'mf-country-state-city';
import * as csc from 'mf-country-state-city'


@Component({
  selector: 'mf-csc-picker',
  styleUrls: ['./csc-picker.component.scss'],
  templateUrl: './csc-picker.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CountryStateCityPicker implements AfterViewInit {

  @Input() disabled: boolean = false;
  @Input() countryLabel: string = 'Country';
  @Input() stateLabel: string = 'State';
  @Input() cityLabel: string = 'City';
  @Input() defaultValue: string = '';
  @Input() cityMandatoryMessage: string = 'City is mandatory';
  @Input() showErrorCondition = false;

  @Output() OnCitySelected: EventEmitter<string> = new EventEmitter();

  countries = csc.getAllCountries();
  cities: ICity[] | undefined;
  states: IState[] | undefined;

  currentCountry: ICountry | undefined;
  currentCity: ICity | undefined;
  currentState: IState | undefined;

  changeCountry(value: ICountry) {
    this.currentCountry = value;
    this.currentCity = undefined;
    this.currentState = undefined;
    this.states = csc.getStatesOfCountry(value.isoCode);
    if (!this.states || this.states.length == 0) {
      this.states = [{
        name: this.currentCountry.name,
        countryCode: this.currentCountry.isoCode,
      } as IState];
      this.changeState(this.states[0]);

    }
  }

  changeState(value: IState) {
    this.currentState = value;
    this.currentCity = undefined;
    this.cities = csc.getCitiesOfState(value.countryCode, value.isoCode);
    if (!this.cities || this.cities.length == 0) {
      this.cities = [{
        name: this.currentState.name,
        countryCode: value.countryCode,
        stateCode: value.isoCode
      } as ICity];
      this.changeCity(this.cities[0]);
    }
  }


  changeCity(value: ICity) {
    if (!this.currentCountry || !this.currentState) return;
    this.currentCity = value;
    const str = this.currentCountry.name + ' - ' + this.currentState.name + ' - ' + this.currentCity.name;
    this.OnCitySelected.emit(str);
  }

  getCountryByName(country: string) {
    return this.countries.filter(value => value.name === country)[0];
  }

  getStateByCountry(stateName: string) {
    return csc.getAllStates().filter(value => value.name === stateName)[0];
  }

  getCity(cityName: string) {
    return csc.getAllCities().filter(value => value.name === cityName)[0];
  }


  ngAfterViewInit(): void {
    if (this.defaultValue) {
      const cscValues = this.defaultValue.split('-');
      this.currentCountry = this.getCountryByName(cscValues[0].trim());
      this.changeCountry(this.currentCountry);
      this.currentState = this.getStateByCountry(cscValues[1].trim());
      this.changeState(this.currentState);
      this.currentCity = this.getCity(cscValues[2].trim());
      this.changeCity(this.currentCity);
    }
  }

}
