import { Component, OnInit } from '@angular/core';
import { ContinentsService, Continent } from 'src/app/demo/service/continents.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DialogModule],
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss']
})
export class ContinentsComponent implements OnInit {
  continents: Continent[] = [];
  newContinent: Continent = { continent_name: '' }; // Initialize for the form
  loading: boolean = true;
  selectedContinent: Continent = { continent_name: '' }; // For editing

  editDialogVisible: boolean = false;

  constructor(private continentsService: ContinentsService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getContinents();
  }

  getContinents() {
    console.log("Calling getContinents() method...");
    this.continentsService.getContinents().subscribe(
      (data) => {
        console.log('Continents received:', data);
        this.continents = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching continents', error);
        this.loading = false;
      }
    );
  }

  addContinent() {
    console.log('Form submitted:', this.newContinent);
    if (!this.newContinent.continent_name.trim()) {
      console.error('Continent name cannot be empty');
      return;
    }

    this.continentsService.addContinent(this.newContinent).subscribe(
      (data) => {
        console.log('New continent added:', data);
        this.getContinents(); // Refresh the table after adding
        this.newContinent = { continent_name: '' }; // Reset the form
      },
      (error) => {
        console.error('Error adding continent', error);
      }
    );
  }

  deleteContinent(continentId: number) {
    this.continentsService.deleteContinent(continentId).subscribe(
      () => {
        console.log(`Continent deleted successfully`);
        
        this.getContinents(); // Refresh the table after deleting
        this.cdr.detectChanges();
      },
      (error) => {
        this.getContinents(); 
        console.error(`Error deleting continent: ${error.message}`);
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


  openEditDialog(continent: Continent) {
    this.selectedContinent = { ...continent }; // Clone the continent to avoid direct modification
    this.editDialogVisible = true;
  }

  updateContinent() {
    if (!this.selectedContinent.continent_name.trim()) {
      console.error('Continent name cannot be empty');
      return;
    }

    const { continent_id, continent_name } = this.selectedContinent;
    this.continentsService.updateContinent(continent_id!, { continent_name }).subscribe(
      () => {
        this.getContinents(); // Refresh the table
        this.editDialogVisible = false; // Close the dialog
      },
      (error) => {
        console.error('Error updating continent', error);
      }
    );
  }
}
