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
  showHide: boolean = false;
  showEdit: boolean = false;
  showDeleteConfirmation: boolean = false;
  partToEditId: any;
  vehicleToEdit: string;
  partDescriptionToEdit: string;
  forSaleToEdit: string;
  forTradeToEdit: string;
  upDatedPart: any;
  partToDelete: string;
  idToDelete: any;
  vehicleToDelete: string;
  partDescriptionToDelete: string;
  forTradeToDelete: string;
  forSaleToDelete: string;

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
  

  // HIDE OR SHOW ELEMENTS
  changeShowStatus(){
    this.showHide = !this.showHide;
  }

  showEditForm(){
    this.showEdit = !this.showEdit;
  };

  deleteConfirm(){
    this.showDeleteConfirmation = !this.showDeleteConfirmation;
  };

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

    //  Register Part
    this.authService.registerPart(part).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessage.show('Your part has been listed!', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    location.reload();
  }


  // EDIT A PART

  // Capture of part information at "EDIT" button
  partEdit(part: any){
    this.vehicleToEdit = part.vehicle;
    this.partDescriptionToEdit = part.partDescription;
    this.forSaleToEdit = part.forSale;
    this.forTradeToEdit = part.forTrade;
    this.partToEditId = part._id;
    
    this.showEdit = true;
  };

  onPartEdit(){
    const upDatedPart = {
      _id: this.partToEditId,
      vehicle: this.vehicleToEdit,
      partDescription: this.partDescriptionToEdit,
      forTrade: this.forTradeToEdit,
      forSale: this.forSaleToEdit
    };

    this.authService.editPart(upDatedPart).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessage.show('Your part has been updated!', {cssClass: 'alert-success', timeout: 3000});
        this.showEditForm();
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
      location.reload();
    });
  }


// DELETE A PART
  partDelete(part: any){
    this.idToDelete = part._id;
    this.vehicleToDelete = part.vehicle;
    this.partDescriptionToDelete = part.partDescription;
    this.forTradeToDelete = part.forTrade;
    this.forSaleToDelete = part.forSale;
    console.log(this.idToDelete);
    this.showDeleteConfirmation = true;
  }

  onPartDelete(){
    const partToDelete ={
      _id: this.idToDelete,
      vehicle: this.vehicleToDelete,
      partDescription: this.partDescriptionToDelete,
      forTrade: this.forTradeToDelete,
      forSale: this.forSaleToDelete
    };

    this.authService.deletePart(partToDelete).subscribe(data => {
      console.log(this.idToDelete);
      if(data.success){
        this.flashMessage.show('Your part has been deleted', {cssClass: 'alert-success', timeout: 3000});
        location.reload();
      } else {
        this.flashMessage.show('Part was not deleted, somethings wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
      
    });
  }
  

 
}

