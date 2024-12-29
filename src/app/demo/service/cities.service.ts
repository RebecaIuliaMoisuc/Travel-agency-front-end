import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Countries {
  country_id: number;
  country_name: string;
}

export interface Cities {
  city_id?: number;
  city_name: string;
  country: Countries;
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'http://localhost:8080/travel_agency/api/cities';

  constructor(private http: HttpClient) { }

  getCities(): Observable<Cities[]> {
    return this.http.get<Cities[]>(this.apiUrl);
  }

  addCity(newCity: Cities): Observable<Cities> {
    return this.http.post<Cities>(`${this.apiUrl}/new_city`, newCity);
  }

  deleteCity(cityId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cityId}`);
  }
}
