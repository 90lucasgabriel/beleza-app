import { Events, App, NavController, ViewController, ModalController, Content }  from 'ionic-angular';
import { Component, ViewChild, ElementRef }                    from '@angular/core';
import { StatusBar } from 'ionic-native';

import { QueryInput }          from '../../../common/models/query-input';
import { Order }               from '../order.model';
import { OrderService }        from '../order.service';
import { UserService }         from '../../user/user.service';

import { OrderCreatePage }     from '../../order/order-create/order-create';
import { UserLoginPage   }     from '../../user/user-login/user-login';
import { LocalStorage }        from '../../../common/services/local-storage';


@Component({
  selector    : 'page-order-list',
  templateUrl : 'order-list.html',
  providers   : [OrderService, UserService]
})
export class OrderListPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public  color       = 'primary';
  public  facebook    = '';
  public  orders      : Array<Order>;
  public  userId      : number = 4;
  public  queryInput  : QueryInput     = {
    page: 1
  };
  public isLogged     : boolean = false;
  public showSpinner  : boolean = false;
  
  constructor(
    public  events         : Events,
    public  navCtrl        : NavController,
    public  viewCtrl       : ViewController,
    private app            : App,
    private modalCtrl      : ModalController,
    private $order         : OrderService,
    private $user          : UserService,
    private $localStorage  : LocalStorage) {

      
    this.init();
    //Cria o evento que verifica se o usuário está logado
    this.events.subscribe('user:login', (value) =>{
      this.init();
    });

  }


  public init(){
    if(this.userIsLogged()){
      this.showSpinner = true;
      this.query();
    }
  }

  public query(): void{
    /*this.queryInput.page = 1;
    this.orders          = null;

    this.$order.query(this.queryInput, this.userId).then(
      data => {
        this.orders      = <Array<Order>> data;
        this.showSpinner = false;
      });
      */
  }

  private userIsLogged(): boolean{
    this.isLogged = this.$user.isLogged();
    return this.isLogged;
  }


  //COMPONENTS ----------------------------------------------------------
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public doInfinite(infiniteScroll): void{
    /*this.queryInput.page = this.queryInput.page + 1;

    this.$order.query(this.queryInput).then(
      data => {
        this.orders   = this.orders  .concat(<Array<Order>> data);
        infiniteScroll.complete();
      }
    );
    */    
  }









  //NAV ------------
  public goBranchDetails(branchId: number): void{
    //this.app.getRootNav().push(BranchDetailsPage, {id: branchId});
  }

   goOrderCreate(branchId: number): void{
    //this.app.getRootNav().push(OrderCreatePage, {id: branchId});
  }

  public goBranchSearch(): void{
    //this.navCtrl.push(BranchSearchPage, {});
  }

  public openLogin(): void{
    let modal = this.modalCtrl.create(UserLoginPage);
    modal.present(); 
  }






  //VIEW ------------------------------------------------------
  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewDidEnter(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }

}
