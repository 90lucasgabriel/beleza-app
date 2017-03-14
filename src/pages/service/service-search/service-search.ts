import { Component, ViewChild } 	  from '@angular/core';
import { NavController }            from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { Service }                  from '../service.model';
import { SERVICE, ServiceService }  from '../service.service';

import { ServiceDetailsPage }       from '../service-details/service-details';


@Component({
  selector    : 'page-service-search',
  templateUrl : 'service-search.html',
  providers   : [SERVICE]
})
export class ServiceSearchPage {
  @ViewChild('searchbar') myInput;

  public  services         : Array<Service>;
  public  originalServices : Array<Service>;
  public  queryInput       : QueryInput     = {
    page: 1
  };
  public picture     = null;
  public showSpinner = true;

  constructor(
  	public navCtrl   : NavController,
  	private $service : ServiceService) {
  }


  //FUNCTIONS --------------------------------------
  public query(): void{
    this.queryInput.page = 1;
    this.services        = null;

  }
  
  public search(searchEvent): void {
    this.showSpinner    = true;
    let term            = searchEvent.target.value;
    let params : Object = {
      include    : 'images',
      data       : term
    }

    if (term.trim() === '' || term.trim().length < 3) {
      this.services = this.originalServices;
    } else {
      this.$service.search(params).then(
      data => {
        this.services    = <Array<Service>> data;
        this.showSpinner = false;
      });
    }
  }







  //COMPONENTS ----------------------------------------
  ionViewDidEnter(): void{
     setTimeout(() => {
      this.myInput.setFocus();
    }, 150);     
  }

  public doInfinite(infiniteScroll): void {
  	this.queryInput.page = this.queryInput.page + 1;

  	this.$service.query(this.queryInput).then(
  		data => {
  			this.services = this.services.concat(<Array<Service>> data);
  			infiniteScroll.complete();
  		}
    );  	
  }






  //NAV ----------------------------------------------------
  public goServiceDetails(serviceId: number): void{
    this.navCtrl.push(ServiceDetailsPage, {id: serviceId});
  }

}
