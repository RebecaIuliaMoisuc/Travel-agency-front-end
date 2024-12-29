import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tours {
  tour_id?: number;
  from_city: { city_id: number, city_name: string };
  to_city: { city_id: number, city_name: string };
  to_hotel: { hotel_id: number, hotel_name: string };
  to_airport: { airport_id: number, airport_name: string };
  departure_date: string;
  return_date: string;
  number_of_days: number;
  type: string;
  adult_price: number;
  child_price: number;
  promoted: boolean;
  adult_seats: string;
  child_seats: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private apiUrl = 'http://localhost:8080/travel_agency/api/tours';

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tours[]> {
    return this.http.get<Tours[]>(this.apiUrl);
  }

  addTour(newTour: Tours): Observable<Tours> {
    return this.http.post<Tours>(`${this.apiUrl}/new_tour`, newTour);
  }

  deleteTour(tourId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tourId}`);
  }
}
