import { Component } 					        from '@angular/core';
import { NavController, NavParams } 	from 'ionic-angular';

import { Service }                  	from '../service.model';
import { SERVICE, ServiceService }  	from '../service.service';

@Component({
  selector    : 'page-service-details',
  templateUrl : 'service-details.html',
  providers   : [SERVICE]
})
export class ServiceDetailsPage {
  public id         : number;
  public service    : Service; 
  public showSpinner: boolean = true;
  public pictures   : Array<Object>;

  constructor(
  public  navCtrl   : NavController,
  private navParams : NavParams,
  private $service  : ServiceService) {

  	this.id = navParams.get('id');
  	this.get(this.id);
  }  



  public get(id: number): void{
    let params : Object = {
      include : 'images',
      id      : id
    }

    this.$service.get(params).then(
      data => {
        this.service     = <Service> data;
        this.pictures    = this.service.images.data;
        this.showSpinner = false;
      });
    
  }





  // COMPONENTS -------------------------------------------


}
