import { Component } 		            from '@angular/core';
import { NavController } 	          from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';

import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector    : 'page-order-list',
  templateUrl : 'order-list.html',
  providers   : []
})
export class OrderListPage {
  public facebook = '';
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = false;

  public services = [
    'Service 1',
    'Service 2',
    'Service 3',
    'Service 4',
    'Service 5',
    'Service 6',
    'Service 7',
    'Service 8',
    'Service 9',
    'Service 10',
    'Service 11',
    'Service 12',
    'Service 13',
    'Service 14',
    'Service 15',
    'Service 16',
    'Service 17',
    'Service 18',
    'Service 19',
    'Service 20',
    'Service 21',
    'Service 22',
    'Service 23',
    'Service 24',
    'Service 25',
    'Service 26',
    'Service 27',
    'Service 28',
    'Service 29',
    'Service 30',
    'Service 31'
  ];


  constructor(
    public  navCtrl       : NavController,
    private $localStorage : LocalStorage) {
  }



  







}
