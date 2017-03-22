import { NavController, ViewController }             from 'ionic-angular';
import { Component }                from '@angular/core';
import { StatusBar }                from 'ionic-native';

import { QueryInput }               from '../../../common/models/query-input';
import { User }                     from '../user.model';
import { UserService }              from '../user.service';


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
  public showSpinner = false;

  public professionals = [
    {id: 1, description: 'Professional 1'},
    {id: 2, description: 'Professional 2'},
    {id: 3, description: 'Professional 3'},
    {id: 4, description: 'Professional 4'},
    {id: 5, description: 'Professional 5'},
    {id: 6, description: 'Professional 6'},
    {id: 7, description: 'Professional 7'},
    {id: 8, description: 'Professional 8'},
    {id: 9, description: 'Professional 9'},
    {id: 10, description: 'Professional 10'},
    {id: 11, description: 'Professional 11'},
    {id: 12, description: 'Professional 12'},
    {id: 13, description: 'Professional 13'},
    {id: 14, description: 'Professional 14'},
    {id: 15, description: 'Professional 15'},
    {id: 16, description: 'Professional 16'},
    {id: 17, description: 'Professional 17'},
    {id: 18, description: 'Professional 18'},
    {id: 19, description: 'Professional 19'},
    {id: 20, description: 'Professional 20'},
    {id: 21, description: 'Professional 21'},
    {id: 22, description: 'Professional 22'},
    {id: 23, description: 'Professional 23'},
    {id: 24, description: 'Professional 24'},
    {id: 25, description: 'Professional 25'},
    {id: 26, description: 'Professional 26'},
    {id: 27, description: 'Professional 27'},
    {id: 28, description: 'Professional 28'},
    {id: 29, description: 'Professional 29'},
    {id: 30, description: 'Professional 30'}
    
  ];



  constructor(
    public  navCtrl       : NavController,
    public  viewCtrl      : ViewController,
    private $user         : UserService,
    private $localStorage : LocalStorage) {
  }



  
  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }





  //VIEW ------------------------------------------------------
  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewWillEnter(){
    StatusBar.backgroundColorByHexString('#CCC');
  }


}
