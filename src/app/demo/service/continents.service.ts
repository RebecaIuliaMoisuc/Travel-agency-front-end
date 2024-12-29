import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Continent {
  continent_id?: number;  // ID-ul poate fi opțional
  continent_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContinentsService {

  private apiUrl = 'http://localhost:8080/travel_agency/api/continents';  // URL-ul endpoint-ului din backend
  private apiUrl2 = 'http://localhost:8080/travel_agency/api'; 
  constructor(private http: HttpClient) {}

  getContinents(): Observable<Continent[]> {
    console.log("Calling getContinents() method...");
    return this.http.get<Continent[]>(this.apiUrl);
}

addContinent(continent: Continent): Observable<Continent> {
  console.log("Calling addContinent() method...");
  return this.http.post<Continent>(`${this.apiUrl2}/new_continent`, continent);
}

deleteContinent(continentId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${continentId}`);
}

updateContinent(continentId: number, updatedContinent: Continent): Observable<Continent> {
  console.log("Calling updateContinent() method...");
  return this.http.put<Continent>(`${this.apiUrl}/${continentId}`, updatedContinent);
}

}
