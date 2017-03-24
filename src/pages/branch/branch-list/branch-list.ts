import { App, NavController, ViewController, ModalController, Events, Content }  from 'ionic-angular';
import { Component, ViewChild, ElementRef }                    from '@angular/core';
import { StatusBar } from 'ionic-native';

import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker} from 'ionic-native';

/*
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
*/
import { QueryInput }          from '../../../common/models/query-input';
import { Branch }              from '../branch.model';
import { BranchService }       from '../branch.service';

import { BranchDetailsPage }   from '../branch-details/branch-details';
import { BranchSearchPage }    from '../branch-search/branch-search';
import { OrderCreatePage }     from '../../order/order-create/order-create';
import { LocalStorage }        from '../../../common/services/local-storage';


@Component({
  selector    : 'page-branch-list',
  templateUrl : 'branch-list.html',
  providers   : [BranchService]
})
export class BranchListPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public  color       = 'primary';
  public  facebook    = '';
  public  branches    : Array<Branch>;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public showSpinner  = true;
  public tab          = 'list';

  constructor(
    public  events         : Events,
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private app            : App,
    private modalCtrl      : ModalController,
    private $branch        : BranchService,
    private $localStorage  : LocalStorage) {

    //this.loadMap();
    this.query();
  }



  public query(): void{
    this.queryInput.page = 1;
    this.branches        = null;

    this.$branch.query(this.queryInput).then(
      data => {
        this.branches    = <Array<Branch>> data;
        this.showSpinner = false;
      });
  }



  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public doInfinite(infiniteScroll): void{
    this.queryInput.page = this.queryInput.page + 1;

    this.$branch.query(this.queryInput).then(
      data => {
        this.branches = this.branches.concat(<Array<Branch>> data);
        infiniteScroll.complete();
      }
    );    
  }









  //NAV ----------------------------------------------------
  public goBranchDetails(branchId: number): void{
    this.app.getRootNav().push(BranchDetailsPage, {id: branchId});
  }

  public goOrderCreate(branchId: number): void{
    this.app.getRootNav().push(OrderCreatePage, {id: branchId});
  }


  public goBranchSearch(): void{
    this.navCtrl.push(BranchSearchPage, {});
  }






  //VIEW ------------------------------------------------------
  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewDidEnter(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

}
