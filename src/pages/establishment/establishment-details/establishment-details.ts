import { Component } 					        from '@angular/core';
import { NavController, NavParams } 	from 'ionic-angular';

import { Establishment }              from '../establishment.model';
import { EstablishmentService }  	    from '../establishment.service';

import { OrderWorkflowPage }          from '../../order/order-workflow/order-workflow';

@Component({
  selector    : 'page-establishment-details',
  templateUrl : 'establishment-details.html',
  providers   : [EstablishmentService]
})
export class EstablishmentDetailsPage {
  public id         : number;
  public establishment    : Establishment; 
  public showSpinner: boolean = false;
  public pictures = [
    {id:1 , url: "http://lorempixel.com/300/300/city/"},
    {id:2 , url: "http://lorempixel.com/300/300/city/"},
    {id:3 , url: "http://lorempixel.com/300/300/city/"},
    {id:4 , url: "http://lorempixel.com/300/300/city/"},
    {id:5 , url: "http://lorempixel.com/300/300/city/"}
  ];

  constructor(
  public  navCtrl   : NavController,
  private navParams : NavParams,
  private $establishment  : EstablishmentService) {

  	this.id = navParams.get('id');
  	this.get(this.id);
  }  



  public get(id: number): void{
    let params : Object = {
      include : 'images',
      id      : id
    }

    this.$establishment.get(params).then(
      data => {
        this.establishment     = <Establishment> data;
        this.pictures    = this.establishment.images.data;
        this.showSpinner = false;
      });
    
  }





  // COMPONENTS -------------------------------------------
  public goOrderWorkflow(establishmentId: number): void{
    this.navCtrl.push(OrderWorkflowPage, {id: establishmentId});
  }


}
