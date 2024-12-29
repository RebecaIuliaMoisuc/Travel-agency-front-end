import { Component, OnInit } from '@angular/core';
import { CitiesService, Cities } from 'src/app/demo/service/cities.service';
import { CountriesService, Countries } from 'src/app/demo/service/countries.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'; // Ensure this is imported
@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cities: Cities[] = [];
  newCity: Cities = { city_id: 0, city_name: '', country: { country_id: 0, country_name: '' } };
  loading: boolean = true;
  countries: Countries[] = [];

  constructor(private citiesService: CitiesService, private countriesService: CountriesService) {}

  ngOnInit() {
    console.log("Calling getCities() method...");
    this.citiesService.getCities().subscribe(
      data => {
        console.log('Cities received:', data);
        this.cities = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching cities', error);
        this.loading = false;
      }
    );

    console.log("Calling getCountries() method...");
    this.countriesService.getCountries().subscribe(
      data => {
        console.log('Countries received:', data);
        this.countries = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching countries', error);
        this.loading = false;
      }
    );
  }

  addCity() {
    this.citiesService.addCity(this.newCity).subscribe(
      data => {
        console.log('New city added:', data);
        this.cities.push(data);  
        this.newCity = { city_id: 0, city_name: '', country: { country_id: 0, country_name: '' } };  
      },
      error => {
        console.error('Error adding city', error);
      }
    );
  }

  deleteCity(cityId: number) {
    this.citiesService.deleteCity(cityId).subscribe(
      () => {
        console.log(`City deleted successfully`);
        const index = this.cities.findIndex(c => c.city_id === cityId);
        if (index !== -1) {
          this.cities.splice(index, 1);
        }
      },
      error => {
        console.error(`Error deleting city: ${error.message}`);
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
