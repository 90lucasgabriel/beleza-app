import { Component, ViewChild } 		            from '@angular/core';
import { NavController, ViewController, NavParams } 	          from 'ionic-angular';
import { StatusBar }                from 'ionic-native';


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
  @ViewChild('searchbar') searchbar;

  public facebook = '';
  //public  services    : Array<Service>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = false;
  public services = [];
  public branchId: number;
  constructor(
    public  navCtrl       : NavController,
    private navParams     : NavParams,
    public  viewCtrl      : ViewController,
    private $service      : ServiceService,
    private $localStorage : LocalStorage) {


    this.branchId      = this.navParams.get('branchId');
    this.query();
  }




  public query(): void{
    this.queryInput.page = 1;
    this.services        = null;

    this.$service.queryJobsByBranch(this.queryInput.page, this.branchId).then(
      data => {
        this.services    = <Array<any>> data;
        this.showSpinner = false;
      });
  }




  //COMPONENTS ----------------------------------------------------------
  public dismiss(jobId?: number) {
    this.viewCtrl.dismiss({jobId: jobId});
  }



  //NAV ----------------------------------------------------
  public goServiceDetails(serviceId: number): void{
    this.navCtrl.push(ServiceDetailsPage, {id: serviceId});
  }

  public goServiceSearch(): void{
    this.navCtrl.push(ServiceSearchPage, {});
  }





  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    StatusBar.backgroundColorByHexString('#CCC');
  }

  public ionViewDidEnter(){
    /*setTimeout(() => {
      this.searchbar.setFocus();
    }, 150);   */
  }

  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }


}
