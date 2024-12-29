import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private apiUrl = 'http://localhost:8080/travel_agency/api/packages'; // Base URL for your backend API

  constructor(private http: HttpClient) {}

  /**
   * Get all packages
   * @returns Observable containing a list of packages
   */
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Get a specific package by ID
   * @param id Package ID
   * @returns Observable containing the package details
   */
  getPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new package
   * @param packageData Data for the new package
   * @returns Observable of the created package
   */
  createPackage(packageData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, packageData);
  }

  /**
   * Update an existing package
   * @param id Package ID
   * @param packageData Updated package data
   * @returns Observable of the updated package
   */
  updatePackage(id: number, packageData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, packageData);
  }

  /**
   * Delete a package
   * @param id Package ID
   * @returns Observable of the deletion result
   */
  deletePackage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Reserve a package
   * @param packageId ID of the package to reserve
   * @returns Observable of the reservation result
   */
  reservePackage(packageId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserve`, packageId);
  }
  
}
