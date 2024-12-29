import { Component, OnInit } from '@angular/core';
import { ToursService, Tours } from 'src/app/demo/service/tours.service';
import { CitiesService, Cities } from 'src/app/demo/service/cities.service';
import { HotelsService, Hotels } from 'src/app/demo/service/hotels.service';
import { AirportsService, Airports } from 'src/app/demo/service/airports.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule, CalendarModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  tours: Tours[] = [];
  newTour: Tours = {
    tour_id: 0, 
    from_city: { city_id: 0, city_name: '' }, 
    to_city: { city_id: 0, city_name: '' }, 
    to_hotel: { hotel_id: 0, hotel_name: '' }, 
    to_airport: { airport_id: 0, airport_name: '' },
    departure_date: '',
    return_date: '',
    number_of_days: 0,
    type: '',
    adult_price: 0,
    child_price: 0,
    promoted: false,
    adult_seats: '',
    child_seats: ''
  };
  loading: boolean = true;
  cities: Cities[] = [];
  hotels: Hotels[] = [];
  airports: Airports[] = [];

  constructor(private toursService: ToursService, private citiesService: CitiesService, private hotelsService: HotelsService, private airportsService: AirportsService) {}

  ngOnInit() {
    this.toursService.getTours().subscribe(
      data => {
        this.tours = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching tours', error);
        this.loading = false;
      }
    );

    this.citiesService.getCities().subscribe(
      data => {
        this.cities = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching cities', error);
        this.loading = false;
      }
    );

    this.hotelsService.getHotels().subscribe(
      data => {
        this.hotels = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching hotels', error);
        this.loading = false;
      }
    );

    this.airportsService.getAirports().subscribe(
      data => {
        this.airports = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching airports', error);
        this.loading = false;
      }
    );
  }

  addTour() {
    this.toursService.addTour(this.newTour).subscribe(
      data => {
        this.tours.push(data);
        this.newTour = {
          tour_id: 0, 
          from_city: { city_id: 0, city_name: '' }, 
          to_city: { city_id: 0, city_name: '' }, 
          to_hotel: { hotel_id: 0, hotel_name: '' }, 
          to_airport: { airport_id: 0, airport_name: '' },
          departure_date: '',
          return_date: '',
          number_of_days: 0,
          type: '',
          adult_price: 0,
          child_price: 0,
          promoted: false,
          adult_seats: '',
          child_seats: ''
        };
      },
      error => {
        console.error('Error adding tour', error);
      }
    );
  }

  deleteTour(tourId: number) {
    this.toursService.deleteTour(tourId).subscribe(
      () => {
        const index = this.tours.findIndex(t => t.tour_id === tourId);
        if (index !== -1) {
          this.tours.splice(index, 1);
        }
      },
      error => {
        console.error(`Error deleting tour: ${error.message}`);
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
