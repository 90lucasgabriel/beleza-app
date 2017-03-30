import { Events, App, NavController, ViewController, ModalController, Content }  from 'ionic-angular';
import { Component, ViewChild, ElementRef }                    from '@angular/core';
import { StatusBar } from 'ionic-native';

import { QueryInput }          from '../../../common/models/query-input';
import { Schedule }               from '../schedule.model';
import { ScheduleService }        from '../schedule.service';
import { UserService }         from '../../user/user.service';

import { ScheduleCreatePage }     from '../../schedule/schedule-create/schedule-create';
import { UserLoginPage   }     from '../../user/user-login/user-login';
import { LocalStorage }        from '../../../common/services/local-storage';


@Component({
  selector    : 'page-schedule-list',
  templateUrl : 'schedule-list.html',
  providers   : [ScheduleService, UserService]
})
export class ScheduleListPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public  color       = 'primary';
  public  facebook    = '';
  public  schedules      : Array<Schedule>;
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
    private $schedule      : ScheduleService,
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
    this.schedules          = null;

    this.$schedule.query(this.queryInput, this.userId).then(
      data => {
        this.schedules      = <Array<Schedule>> data;
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

    this.$schedule.query(this.queryInput).then(
      data => {
        this.schedules   = this.schedules  .concat(<Array<Schedule>> data);
        infiniteScroll.complete();
      }
    );
    */    
  }









  //NAV ------------
  public goBranchDetails(branchId: number): void{
    //this.app.getRootNav().push(BranchDetailsPage, {id: branchId});
  }

  public goScheduleCreate(branchId: number): void{
    //this.app.getRootNav().push(ScheduleCreatePage, {id: branchId});
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
