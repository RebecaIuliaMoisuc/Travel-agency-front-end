import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Airports {
  airport_id?: number;
  airport_name: string;
  city: {
    city_id: number;
    city_name: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  private apiUrl = 'http://localhost:8080/travel_agency/api/airports';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airports[]> {
    return this.http.get<Airports[]>(this.apiUrl);
  }

  addAirport(newAirport: Airports): Observable<Airports> {
    return this.http.post<Airports>(`${this.apiUrl}/new_airport`, newAirport);
  }

  deleteAirport(airportId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${airportId}`);
  }
}
