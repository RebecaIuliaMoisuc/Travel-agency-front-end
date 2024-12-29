import { Component, OnInit } from '@angular/core';
import { AirportsService, Airports } from 'src/app/demo/service/airports.service';
import { CitiesService, Cities } from 'src/app/demo/service/cities.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airports',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule],
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit {
  airports: Airports[] = [];
  newAirport: Airports = { airport_id: 0, airport_name: '', city: { city_id: 0, city_name: '' } };
  loading: boolean = true;
  cities: Cities[] = [];

  constructor(private airportsService: AirportsService, private citiesService: CitiesService) {}

  ngOnInit() {
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

  addAirport() {
    this.airportsService.addAirport(this.newAirport).subscribe(
      data => {
        this.airports.push(data);
        this.newAirport = { airport_id: 0, airport_name: '', city: { city_id: 0, city_name: '' } };
      },
      error => {
        console.error('Error adding airport', error);
      }
    );
  }

  deleteAirport(airportId: number) {
    this.airportsService.deleteAirport(airportId).subscribe(
      () => {
        const index = this.airports.findIndex(a => a.airport_id === airportId);
        if (index !== -1) {
          this.airports.splice(index, 1);
        }
      },
      error => {
        console.error(`Error deleting airport: ${error.message}`);
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
