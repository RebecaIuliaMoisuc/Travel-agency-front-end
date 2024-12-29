import { Component, OnInit } from '@angular/core';
import { HotelsService, Hotels } from 'src/app/demo/service/hotels.service';
import { CitiesService, Cities } from 'src/app/demo/service/cities.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels: Hotels[] = [];
  newHotel: Hotels = { hotel_id: 0, hotel_name: '', number_of_stars: 0, description: '', city: { city_id: 0, city_name: '' } };
  loading: boolean = true;
  cities: Cities[] = [];

  constructor(private hotelsService: HotelsService, private citiesService: CitiesService) {}

  ngOnInit() {
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
  }

  addHotel() {
    this.hotelsService.addHotel(this.newHotel).subscribe(
      data => {
        this.hotels.push(data);
        this.newHotel = { hotel_id: 0, hotel_name: '', number_of_stars: 0, description: '', city: { city_id: 0, city_name: '' } };
      },
      error => {
        console.error('Error adding hotel', error);
      }
    );
  }

  deleteHotel(hotelId: number) {
    this.hotelsService.deleteHotel(hotelId).subscribe(
      () => {
        const index = this.hotels.findIndex(h => h.hotel_id === hotelId);
        if (index !== -1) {
          this.hotels.splice(index, 1);
        }
      },
      error => {
        console.error(`Error deleting hotel: ${error.message}`);
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
