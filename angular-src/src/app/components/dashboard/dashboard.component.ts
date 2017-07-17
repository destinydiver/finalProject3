import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  parts: any[];

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

  // Register Part
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
}