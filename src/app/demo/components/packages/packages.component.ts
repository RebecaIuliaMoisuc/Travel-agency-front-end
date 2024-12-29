import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToursPurchasedService, ToursPurchased } from 'src/app/demo/service/pourchasedtours.service';
import { ToursService, Tours } from 'src/app/demo/service/tours.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { PackagesService } from '../../service/packages.service';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-package-tours',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, DropdownModule, CardModule,ConfirmDialogModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PackagesComponent implements OnInit {
  packages: any[] = [];
  loading: boolean;

  constructor(private http: HttpClient,
    private packagesService: PackagesService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
   
    console.log("Calling getContinents() method...");
    this.packagesService.getPackages().subscribe(
      data => {
        console.log(' received:', data);
        this.packages = data;
        this.cdr.detectChanges(); // Trigger change detection
      },
      error => {
        console.error('Error fetching continents', error);
 
      }
    );
  }
  
  confirmReserve(event: Event, packageData: any) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to reserve the package <b>${packageData.packageName}</b>?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.reservePackage(packageData); // Call the reservePackage method
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Reservation was cancelled',
        });
      },
    });
  }


  reservePackage(packageData: any) {
    if (packageData.availablePackages > 0) {
      this.packagesService.reservePackage(packageData.packageId).subscribe(() => {
        packageData.availablePackages -= 1; // Update UI after successful reservation
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Unavailable',
        detail: 'No available packages left!',
      });
    }
  }
}
