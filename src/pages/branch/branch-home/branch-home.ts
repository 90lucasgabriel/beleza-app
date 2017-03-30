import { NavController, ViewController, ModalController, Tabs, NavParams }      from 'ionic-angular';
import { Component, ViewChild }      from '@angular/core';
import { StatusBar }                 from 'ionic-native';

import { BranchListPage }            from '../branch-list/branch-list';
import { BranchListFavoritesPage }   from '../branch-list-favorites/branch-list-favorites';
import { BranchSearchPage }          from '../branch-search/branch-search';
import { OrderCreatePage }           from '../../order/order-create/order-create';
import { OrderListPage }             from '../../order/order-list/order-list';
import { LocalStorage }              from '../../../common/services/local-storage';


@Component({
  selector    : 'page-branch-home',
  templateUrl : 'branch-home.html',
  providers   : []
})
export class BranchHomePage {
  @ViewChild('tabs') tabs: Tabs;

  public showSpinner  : boolean = false;
  public nearTab      : any;
  public favoritesTab : any;
  public schedulesTab : any;
  public activeTab    : string;
  public color        : string  = 'primary';

  constructor(
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private modalCtrl      : ModalController,
    public  navParams      : NavParams
    ) {

    this.nearTab           = BranchListPage;
    this.favoritesTab      = BranchListFavoritesPage;
    this.schedulesTab      = OrderListPage;
    this.query();
  }



  public query(): void{
    
  }







  //NAV -------------------------------------------------------
  public goBranchSearch(): void{
    this.navCtrl.push(BranchSearchPage, {});
    

  }






  //VIEW ------------------------------------------------------
  public ionViewWillEnter(){
    let params = this.navParams.get('params');
    this.tabs.select(params.tab);

    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }


}
