import { Component, OnInit } from '@angular/core';
import { CountriesService, Countries } from 'src/app/demo/service/countries.service';
import { ContinentsService, Continent } from 'src/app/demo/service/continents.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, TableModule,DropdownModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countries: Countries[] = [];
  loading: boolean = true;
  newCountry: Countries = { country_id: 0, country_name: '', continent_id:null }; // Add continent_id field
  continents: Continent[] = []; // Dropdown options
  constructor(private countriesService: CountriesService, private continentsService: ContinentsService) {}

  ngOnInit() {
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
     // Load continents for dropdown
     this.continentsService.getContinents().subscribe(
      data => {
        console.log('Continents received:', data);
        this.continents = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching continents', error);
        this.loading = false;
      }
    );
  }
  addCountry() {
    this.countriesService.addCountry(this.newCountry).subscribe(
      data => {
        console.log('New country added:', data);
        this.countries.push(data);  // Add the new country to the list
        this.newCountry = { country_name: '', continent_id: 0 };  // Reset the form
      },
      error => {
        console.error('Error adding country', error);
      }
    );
  }


  deleteCountry(country: Countries) {
    // Implement delete functionality here
  }

  onGlobalFilter(event: Event, table: any) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  clear(table: any) {
    table.clear();
  }
}
