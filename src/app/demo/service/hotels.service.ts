import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Hotels {
  hotel_id?: number;
  hotel_name: string;
  number_of_stars: number;
  description: string;
  city: {
    city_id: number;
    city_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private apiUrl = 'http://localhost:8080/travel_agency/api/hotels';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotels[]> {
    return this.http.get<Hotels[]>(this.apiUrl);
  }

  addHotel(newHotel: Hotels): Observable<Hotels> {
    return this.http.post<Hotels>(`${this.apiUrl}/new_hotel`, newHotel);
  }

  deleteHotel(hotelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${hotelId}`);
  }
}
