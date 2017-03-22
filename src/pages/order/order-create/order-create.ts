import { Component } 		            from '@angular/core';
import { NavController, NavParams, ModalController } 	          from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { QueryInput }               from '../../../common/models/query-input';
import { LocalStorage }             from '../../../common/services/local-storage';

import { Branch }                   from '../../branch/branch.model';
import { BranchService }            from '../../branch/branch.service';

import { ServiceListPage }          from '../../service/service-list/service-list';
import { UserListPage }             from '../../user/user-list/user-list';


@Component({
  selector    : 'page-order-create',
  templateUrl : 'order-create.html',
  providers   : [BranchService]
})
export class OrderCreatePage {
  public facebook = '';
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public id         : number;
  public branch     : Branch; 
  public showSpinner: boolean = true;


  constructor(
    public  navCtrl       : NavController,
    private modalCtrl     : ModalController,
    private navParams     : NavParams,
    private $branch       : BranchService,
    private $localStorage : LocalStorage) {
  }




  public get(id: number): void{
    let params : Object = {
      id      : id
    }

    this.$branch.get(params).then(
      data => {
        this.branch     = <Branch> data;
        this.showSpinner = false;
      });    
  }

  







  //NAV ----------------------------------------------------
  public showServiceList(): void{
    let modal = this.modalCtrl.create(ServiceListPage);
    modal.present(); 
  }

  public showUserProfessionalList(): void{
    let modal = this.modalCtrl.create(UserListPage);
    modal.present(); 
  }





  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    this.id = this.navParams.get('id');
    this.get(this.id);

    StatusBar.backgroundColorByHexString('#a01b1b');
  }
  
  public ionViewWillLeave(){
    //StatusBar.backgroundColorByHexString('#a01b1b');
  }


}
