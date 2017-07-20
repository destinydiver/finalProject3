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
  showEdit: boolean;
  partToEditId: any;
  vehicleToEdit: string;
  partDescriptionToEdit: string;
  forSaleToEdit: string;
  forTradeToEdit: string;
  upDatedPart: any;

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
      vehicle: this.vehicle,
      partDescription: this.partDescription,
      forTrade: this.forTrade,
      forSale: this.forSale
    }

    console.log('here is the part id to update: ', this.partToEditId);

    //  Register Part
    this.authService.registerPart(part).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessage.show('Your part has been listed!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
    });
  }

  // Capture of part information at "EDIT" button
  partEdit(part: any){
    // console.log(part);
 
    this.vehicleToEdit = part.vehicle;
    this.partDescriptionToEdit = part.partDescription;
    this.forSaleToEdit = part.forSale;
    this.forTradeToEdit = part.forTrade;
    this.partToEditId = part._id;

    this.showEdit = false;
    
  };

  onPartEdit(){
    const upDatedPart = {
      _id: this.partToEditId,
      vehicle: this.vehicleToEdit,
      partDescription: this.partDescriptionToEdit,
      forTrade: this.forTradeToEdit,
      forSale: this.forSaleToEdit
    };
    // console.log(upDatedPart);

    this.authService.editPart(upDatedPart).subscribe(data => {
      
      console.log(upDatedPart);
      if(data.success){
        this.flashMessage.show('Your part has been updated!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
    });
  }

  changeShowStatus(){
    this.showHide = !this.showHide;
  };

  showEditForm(){
    this.showEdit = !this.showEdit;
  };
}

