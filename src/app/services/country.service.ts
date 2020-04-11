import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Imports
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // https://restcountries.eu/
  apiUrl: string = 'https://restcountries.eu/rest/v2/'

  constructor(
    private http: HttpClient
  ) {

  }

  private getQuery(query: string) {
    const url = `${this.apiUrl}${query}`;
    return this.http.get(url);
  }

  getCountries() {
    return this.getQuery('lang/es')
      .pipe(map((response: any[]) => {
        return response.map(country => ({ name: country.name, code: country.alpha3Code }));
      }));
  }
}
