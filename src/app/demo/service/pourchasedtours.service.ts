import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tours {
  tour_id: number;
  tour_name: string;
}

export interface ToursPurchased {
  tour_purchase_id: number;
  tour: Tours;  // Correctly reference the Tours object
  number_of_persons: number;
  total_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToursPurchasedService {
  private apiUrl = 'http://localhost:8080/travel_agency/api/toursPurchased';  // Adjust URL accordingly

  constructor(private http: HttpClient) {}

  getToursPurchased(): Observable<ToursPurchased[]> {
    return this.http.get<ToursPurchased[]>(this.apiUrl);
  }

  addTourPurchase(tourPurchase: ToursPurchased): Observable<ToursPurchased> {
    return this.http.post<ToursPurchased>(this.apiUrl, tourPurchase);
  }

  deleteTourPurchase(tourPurchaseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tourPurchaseId}`);
  }
}
