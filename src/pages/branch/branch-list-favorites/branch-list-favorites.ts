import { Events, App, NavController, ViewController, ModalController, Content }  from 'ionic-angular';
import { Component, ViewChild, ElementRef }                    from '@angular/core';
import { StatusBar } from 'ionic-native';

import { QueryInput }          from '../../../common/models/query-input';
import { Branch }              from '../branch.model';
import { BranchService }       from '../branch.service';
import { UserService }         from '../../user/user.service';

import { BranchDetailsPage }   from '../branch-details/branch-details';
import { BranchSearchPage }    from '../branch-search/branch-search';
import { ScheduleCreatePage }     from '../../schedule/schedule-create/schedule-create';
import { UserLoginPage   }     from '../../user/user-login/user-login';
import { LocalStorage }        from '../../../common/services/local-storage';


@Component({
  selector    : 'page-branch-list-favorites',
  templateUrl : 'branch-list-favorites.html',
  providers   : [BranchService, UserService]
})
export class BranchListFavoritesPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;


  public  color       = 'primary';
  public  facebook    = '';
  public  branches    : Array<Branch>;
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
    private $branch        : BranchService,
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
    this.queryInput.page = 1;
    this.branches        = null; 

    this.$user.getByToken().then(
      userData => {
        this.$branch.queryFavoritesByUser(this.queryInput.page, userData.id).then(
          data => {
            this.branches    = <Array<Branch>> data;
            this.showSpinner = false;
          }
        );
      }
    );    

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
    this.queryInput.page = this.queryInput.page + 1;

    this.$user.getByToken().then(
      userData => {
        this.$branch.queryFavoritesByUser(this.queryInput.page, userData.id).then(
          data => {
            if(data.length > 0){
              this.branches = this.branches.concat(<Array<Branch>> data);
            }
            else{
              this.queryInput.page = this.queryInput.page - 1;
            }
            infiniteScroll.complete();
          }
        );
      }
    );  
    
  }









  //NAV ----------------------------------------------------
  public goBranchDetails(branchId: number): void{
    this.app.getRootNav().push(BranchDetailsPage, {id: branchId});
  }

  public goscheduleCreate(branchId: number): void{
    this.app.getRootNav().push(ScheduleCreatePage, {id: branchId});
  }

  public goBranchSearch(): void{
    this.navCtrl.push(BranchSearchPage, {});
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
