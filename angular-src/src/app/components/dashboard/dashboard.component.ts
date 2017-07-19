import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NgFor } from "@angular/common/src/directives";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  parts: any[];
  part: any;
  showHide: boolean;
  partToEditId: any;
  vehicleToEdit: string;
  partDescriptionToEdit: string;
  forSaleToEdit: string;
  forTradeToEdit: string;

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
    ) { }


  ngOnInit() {
    this.authService.getParts().subscribe(dashboard => {
      console.log(dashboard);
      this.parts = dashboard.parts;
    })

  }
  
  

  vehicle: String;
  partDescription: String;
  forTrade: Boolean;
  forSale: Number

  onPartSubmit(){
    const part = {
      vehicle: this.vehicleToEdit,
      partDescription: this.partDescriptionToEdit,
      forTrade: this.forTradeToEdit,
      forSale: this.forSaleToEdit
    }

    // onPartSubmit(){
    // const part = {
    //   vehicle: this.vehicle,
    //   partDescription: this.partDescription,
    //   forTrade: this.forTrade,
    //   forSale: this.forSale
    // }

    console.log('here is the part id to update: ', this.partToEditId);

  // Register Part
    // this.authService.registerPart(part).subscribe(data => {
    //   console.log(data);
    //   if(data.success){
    //     this.flashMessage.show('Your part has been listed!', {cssClass: 'alert-success', timeout: 3000});
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    //     this.router.navigate(['/dashboard']);
    //   }
    // });
  }

  partEdit(part: any){
    console.log(part);

    this.partToEditId = part._id;
    this.vehicleToEdit = part.vehicle;
    this.partDescriptionToEdit = part.partDescription;
    this.forSaleToEdit = part.forSale;
    this.forTradeToEdit = part.forTrade;

    this.showHide = false;
    
 
    
  };

  changeShowStatus(){
    this.showHide = !this.showHide;
  };

  setFormData(data){
    data = data || {};
    
    const part = {

    }
  }
  
}

