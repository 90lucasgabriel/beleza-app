import { Injectable } 		       from '@angular/core';
import { Events, AlertController, ModalController, MenuController }       from 'ionic-angular';
import { Facebook }              from 'ionic-native';
import 'rxjs/add/operator/map';

import { Token }                 from '../../common/models/token';
import { QueryInput }            from '../../common/models/query-input';
import { LocalStorage }          from '../../common/services/local-storage';

import { Schedule } 			           from './schedule.model';
import { ScheduleResource } 	       from './schedule.resource';



@Injectable()
export class ScheduleService {
  private schedule : Schedule;
  public  message  : any;


  constructor(
    public  events        : Events,
    public  alertCtrl     : AlertController,
    private modalCtrl     : ModalController,
    private menuCtrl      : MenuController,
    private $localStorage : LocalStorage,
    private scheduleRes   : ScheduleResource
  ) {}






  //FUNCTIONS -----------------------------------------------------
  public query(){

  }
  
  public get(id): Promise<Schedule>{
    return new Promise<Schedule>( 
      (resolve, reject) => {
    		this.scheduleRes.get(id).$observable.subscribe( 
          getData => {
      			resolve(getData);
    		  },
          getError => {
            reject(getError);
          }
        )
  	  }
    );
  }

  public register(schedule: Schedule): Promise<Schedule>{
    return new Promise( resolve => {
      this.scheduleRes.register(schedule).$observable.subscribe( 
        registerData => {
          if(registerData){
            schedule.schedulename = registerData.email;
            schedule.picture  = registerData.picture;
          }
          this.login(schedule);
          resolve(schedule);
        },
        registerDataError => {
          this.showAlert('registerDataError', registerDataError);
        }
      )
    }); 
  }

  public login(data: Schedule): Promise<Object>{
    return new Promise( resolve => {
      this.scheduleRes.login(data).$observable
        .subscribe( 
          loginData => {
            console.log('loginData', loginData);
            console.log('loginData2', data);
            this.$localStorage.set('token', loginData);
            this.events.publish('schedule:login', true);
            //resolve(loginData);
          },
          loginDataError => {
            console.log('loginDataError', loginDataError);
            //this.showAlert('LoginError', JSON.stringify(loginDataError));
            this.showAlert('Erro', 'Usuário e/ou senha inválidos.');
            //resolve(loginDataError);
          }
        )
    });
  }

  public logout(): void {
    this.$localStorage.remove('token');
    this.events.publish('schedule:login', false);
  }

  private getToken(): Token{
    return this.$localStorage.get('token');
  } 

  public getByToken(): Promise<Schedule>{
    //this.scheduleRes.setHeaders('Bearer ' + this.getToken());
    return new Promise<Schedule>(
      (resolve, reject) => {
        this.scheduleRes.schedule().$observable.subscribe(
          scheduleData => {
            resolve(scheduleData);
          },
          scheduleError => {
            this.refreshToken();
            reject(scheduleError);
            console.log('scheduleError', scheduleError);
          }
        );
      }
    );
      
  } 

  public refreshToken(): void{

  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    else{
      return false;
    }
  }






  //SOCIAL --------------------------------------------------------
  public loginFacebook(): Promise<boolean>{
    return new Promise( resolve => {
      this.facebookLoginStatus(resolve);
    });
  }








  //FACEBOOK -----------------------------------------------------
  //Verifica se o usuário já está conectado
  private facebookLoginStatus(resolve): void {
    Facebook.getLoginStatus().then(
        statusData => {
          if(statusData.status != "connected"){
            this.facebookLoginRegister();
          }
          else{
            this.facebookAccessToken();
          }
          resolve(true);
        }
      );
  }

  //Inicia o login e verifica se o usuário já existe na base
  private facebookLoginRegister(): void{
    Facebook.login(["public_profile","email"]).then(
      loginData => {
        this.findLocalByToken('facebook', loginData.authResponse.accessToken);
      },
      loginDataError => {
        this.showAlert('LoginDataError', loginDataError);
      }
    );
  }

  //Se já existe na base, receber o token do Facebook
  private facebookAccessToken(): void{
    Facebook.getAccessToken().then(
      tokenData => {
        this.findLocalByToken('facebook', tokenData);  
      },
      tokenDataError => {
        this.showAlert('tokenDataError', tokenDataError);
      }
    );
  }

  //Se existir, fazer login; Senão, pesquisar no Facebook com o token;
  private findLocalByToken(social: string, token: string): void{
    this.scheduleRes.findLocalByToken({social: social, token: token}).$observable.subscribe(
      localData      => {
        let scheduleData: Object = {
          social       : social,
          social_token : token,
          schedulename     : localData.email
        }
        console.log('localData', scheduleData);
        this.login(scheduleData);
      },
      localDataError => {
        this.findSocialByToken(social, token);
      }
    );
  }

  //Se encontrar no Facebook com o token, registrar na base.
  private findSocialByToken(social: string, token: string): void{
    this.scheduleRes.findSocialByToken({social: social, token: token}).$observable.subscribe(
      socialData      => {
        let data = {
          social       : social,
          social_token : token
        };
        this.register(data);        
      },
      socialDataError => {
        this.showAlert('socialDataError', socialDataError);
      }
    );
  }

  //Sair do Facebook
  public logoutFacebook(): void{
    Facebook.logout().then(
      result => {
        this.$localStorage.remove('facebook');
        console.log("logoutFacebook", result);
        return result;
      }
    );
  }






  //COMPONENTS ----------------------------------------------------
  public showAlert(title, subtitle): void{
    let alert    = this.alertCtrl.create({
      title      : title,
      subTitle   : subtitle,
      buttons    : ['OK']
    });

    alert.present();
  }


}
