// @ts-ignore
import countryList from './json/country.json';
// @ts-ignore
import stateList from './json/state.json';
// @ts-ignore
import cityList from './json/city.json';
import {ICity, ICountry, IState} from './interface';

export {ICountry, ICity, IState} from './interface';


export function getStatesOfCountry(countryCode: string): IState[] {
  const states = stateList.filter((value) => {
    return value.countryCode === countryCode;
  });
  return states.sort(compare);
}

export function getCitiesOfState(countryCode: string, stateCode: string): ICity[] {
  const cities = cityList.filter((value: { countryCode: string; stateCode: string; }) => {
    return value.countryCode === countryCode && value.stateCode === stateCode;
  });
  return cities.sort(compare);
}

export function
getCitiesOfCountry(countryCode: string): ICity[] {
  const cities = cityList.filter((value: { countryCode: string; }) => {
    return value.countryCode === countryCode;
  });
  return cities.sort(compare);
}

export function
getAllCountries(): ICountry[] {
  return countryList;
}

export function
getAllStates(): IState[] {
  return stateList;
}

export function
getAllCities(): ICity[] {
  return cityList;
}

export function
getCountryByCode(isoCode: string): ICountry {
  return findEntryByCode(countryList, isoCode);
}

export function
getStateByCode(isoCode: string): IState {
  return findEntryByCode(stateList, isoCode);
}

const findEntryByCode = (source: any, code: string) => {
  if (code && source != null) {
    const codex = source.findIndex((c: any) => {
      return c.isoCode === code;
    });
    return codex !== -1 ? source[codex] : '';
  }
  return '';
};

const compare = (a: any, b: any) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};
