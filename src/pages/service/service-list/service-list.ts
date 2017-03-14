import { Component } 		            from '@angular/core';
import { NavController } 	          from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { Service }                  from '../service.model';
import { SERVICE, ServiceService }  from '../service.service';

import { ServiceDetailsPage }       from '../service-details/service-details';
import { ServiceSearchPage }        from '../service-search/service-search';
import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector    : 'page-service-list',
  templateUrl : 'service-list.html',
  providers   : [ServiceService]
})
export class ServiceListPage {
  public facebook = '';
  public  services    : Array<Service>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;




  constructor(
    public  navCtrl       : NavController,
    private $service      : ServiceService,
    private $localStorage : LocalStorage) {
  	this.query();
  }



  public query(): void{
    this.queryInput.page = 1;
    this.services        = null;

	  this.$service.query(this.queryInput).then(
  		data => {
        this.services    = <Array<Service>> data;
        this.showSpinner = false;
  		});


  }





  //COMPONENTS ----------------------------------------------------------
  public doRefresh(refresher): void{
    this.queryInput.page = 1;
    this.query();    
    refresher.complete();
  }

  public doInfinite(infiniteScroll): void{
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

  public goServiceSearch(): void{
    this.navCtrl.push(ServiceSearchPage, {});
  }

}
