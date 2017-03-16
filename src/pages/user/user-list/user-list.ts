import { Component } 		            from '@angular/core';
import { NavController } 	          from 'ionic-angular';

import { QueryInput }               from '../../../common/models/query-input';

import { LocalStorage }             from '../../../common/services/local-storage';


@Component({
  selector    : 'page-user-list',
  templateUrl : 'user-list.html',
  providers   : []
})
export class UserListPage {
  public facebook = '';
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner = true;




  constructor(
    public  navCtrl       : NavController,
    private $localStorage : LocalStorage) {
  }



  







}
