import { NavController, ViewController } 	          from 'ionic-angular';
import { Component }                  from '@angular/core';

import { QueryInput }                 from '../../../common/models/query-input';
import { Establishment }              from '../establishment.model';
import { EstablishmentService }       from '../establishment.service';

import { EstablishmentDetailsPage }   from '../establishment-details/establishment-details';
import { EstablishmentSearchPage }    from '../establishment-search/establishment-search';
import { OrderWorkflowPage }          from '../../order/order-workflow/order-workflow';
import { LocalStorage }               from '../../../common/services/local-storage';


@Component({
  selector    : 'page-establishment-list',
  templateUrl : 'establishment-list.html',
  providers   : [EstablishmentService]
})
export class EstablishmentListPage {
  public facebook = '';
  //public  establishments    : Array<Establishment>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = false;


  public establishments = [
    {id: 1, description: 'Establishment 1'},
    {id: 2, description: 'Establishment 2'},
    {id: 3, description: 'Establishment 3'},
    {id: 4, description: 'Establishment 4'},
    {id: 5, description: 'Establishment 5'},
    {id: 6, description: 'Establishment 6'},
    {id: 7, description: 'Establishment 7'},
    {id: 8, description: 'Establishment 8'},
    {id: 9, description: 'Establishment 9'},
    {id: 10, description: 'Establishment 10'},
    {id: 11, description: 'Establishment 11'},
    {id: 12, description: 'Establishment 12'},
    {id: 13, description: 'Establishment 13'},
    {id: 14, description: 'Establishment 14'},
    {id: 15, description: 'Establishment 15'},
    {id: 16, description: 'Establishment 16'},
    {id: 17, description: 'Establishment 17'},
    {id: 18, description: 'Establishment 18'},
    {id: 19, description: 'Establishment 19'},
    {id: 20, description: 'Establishment 20'},
    {id: 21, description: 'Establishment 21'},
    {id: 22, description: 'Establishment 22'},
    {id: 23, description: 'Establishment 23'},
    {id: 24, description: 'Establishment 24'},
    {id: 25, description: 'Establishment 25'},
    {id: 26, description: 'Establishment 26'},
    {id: 27, description: 'Establishment 27'},
    {id: 28, description: 'Establishment 28'},
    {id: 29, description: 'Establishment 29'},
    {id: 30, description: 'Establishment 30'}
    
  ];


  constructor(
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private $establishment : EstablishmentService,
    private $localStorage  : LocalStorage) {
  }







  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }



  //NAV ----------------------------------------------------
  public goEstablishmentDetails(establishmentId: number): void{
    this.navCtrl.push(EstablishmentDetailsPage, {id: establishmentId});
  }

  public goOrderWorkflow(establishmentId: number): void{
    this.navCtrl.push(OrderWorkflowPage, {id: establishmentId});
  }


  public goEstablishmentSearch(): void{
    this.navCtrl.push(EstablishmentSearchPage, {});
  }

}
