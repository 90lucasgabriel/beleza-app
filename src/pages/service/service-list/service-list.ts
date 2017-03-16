import { Component } 		            from '@angular/core';
import { NavController, ViewController } 	          from 'ionic-angular';

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
  //public  services    : Array<Service>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = false;


  public services = [
    {id: 1, description: 'Service 1'},
    {id: 2, description: 'Service 2'},
    {id: 3, description: 'Service 3'},
    {id: 4, description: 'Service 4'},
    {id: 5, description: 'Service 5'},
    {id: 6, description: 'Service 6'},
    {id: 7, description: 'Service 7'},
    {id: 8, description: 'Service 8'},
    {id: 9, description: 'Service 9'},
    {id: 10, description: 'Service 10'},
    {id: 11, description: 'Service 11'},
    {id: 12, description: 'Service 12'},
    {id: 13, description: 'Service 13'},
    {id: 14, description: 'Service 14'},
    {id: 15, description: 'Service 15'},
    {id: 16, description: 'Service 16'},
    {id: 17, description: 'Service 17'},
    {id: 18, description: 'Service 18'},
    {id: 19, description: 'Service 19'},
    {id: 20, description: 'Service 20'},
    {id: 21, description: 'Service 21'},
    {id: 22, description: 'Service 22'},
    {id: 23, description: 'Service 23'},
    {id: 24, description: 'Service 24'},
    {id: 25, description: 'Service 25'},
    {id: 26, description: 'Service 26'},
    {id: 27, description: 'Service 27'},
    {id: 28, description: 'Service 28'},
    {id: 29, description: 'Service 29'},
    {id: 30, description: 'Service 30'}
    
  ];


  constructor(
    public  navCtrl       : NavController,
    public  viewCtrl      : ViewController,
    private $service      : ServiceService,
    private $localStorage : LocalStorage) {
  }







  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }



  //NAV ----------------------------------------------------
  public goServiceDetails(serviceId: number): void{
    this.navCtrl.push(ServiceDetailsPage, {id: serviceId});
  }

  public goServiceSearch(): void{
    this.navCtrl.push(ServiceSearchPage, {});
  }

}
