import { Component, OnInit } from '@angular/core';
import { ToursPurchasedService, ToursPurchased } from 'src/app/demo/service/pourchasedtours.service';
import { ToursService, Tours } from 'src/app/demo/service/tours.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-purchased-tours',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule],
  templateUrl: './purchasedtours.component.html',
  styleUrls: ['./purchasedtours.component.scss']
})
export class PurchasedToursComponent implements OnInit {
  toursPurchased: ToursPurchased[] = [];
  loading: boolean = true;
  newTourPurchase: ToursPurchased = { tour_purchase_id: 0, tour: null, number_of_persons: 0, total_price: 0 };
  tours: Tours[] = [];

  constructor(
    private toursPurchasedService: ToursPurchasedService, 
    private toursService: ToursService
  ) {}

  ngOnInit() {
    this.toursPurchasedService.getToursPurchased().subscribe(
      data => {
        this.toursPurchased = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching purchased tours', error);
        this.loading = false;
      }
    );

    this.toursService.getTours().subscribe(
      data => {
        this.tours = data;
      },
      error => {
        console.error('Error fetching tours', error);
      }
    );
  }

  addTourPurchase() {
    this.toursPurchasedService.addTourPurchase(this.newTourPurchase).subscribe(
      data => {
        this.toursPurchased.push(data);
        this.newTourPurchase = { tour_purchase_id: 0, tour: null, number_of_persons: 0, total_price: 0 };
      },
      error => {
        console.error('Error adding tour purchase', error);
      }
    );
  }

  deleteTourPurchase(tourPurchase: ToursPurchased) {
    this.toursPurchasedService.deleteTourPurchase(tourPurchase.tour_purchase_id).subscribe(
      () => {
        this.toursPurchased = this.toursPurchased.filter(tp => tp.tour_purchase_id !== tourPurchase.tour_purchase_id);
      },
      error => {
        console.error('Error deleting tour purchase', error);
      }
    );
  }

  onGlobalFilter(event: Event, table: any) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  clear(table: any) {
    table.clear();
  }
}
