import { Component } 		            from '@angular/core';
import { NavController, ModalController } 	          from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';
import { LocalStorage }             from '../../../common/services/local-storage';

import { ServiceListPage }          from '../../service/service-list/service-list';


@Component({
  selector    : 'page-order-workflow',
  templateUrl : 'order-workflow.html',
  providers   : []
})
export class OrderWorkflowPage {
  public facebook = '';
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;


  constructor(
    public  navCtrl       : NavController,
    private modalCtrl     : ModalController,
    private $localStorage : LocalStorage) {
  }



  







  //NAV ----------------------------------------------------
  public showServiceList(): void{
    let modal = this.modalCtrl.create(ServiceListPage);
    modal.present(); 
  }




}
