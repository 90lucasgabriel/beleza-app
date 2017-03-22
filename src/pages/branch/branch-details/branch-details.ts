import { Component, ViewChild, ElementRef, NgZone } 					        from '@angular/core';
import { NavController, NavParams, Content } 	from 'ionic-angular';
import { StatusBar }                  from 'ionic-native';

import { Branch }                     from '../branch.model';
import { BranchService }  	          from '../branch.service';

import { OrderCreatePage }            from '../../order/order-create/order-create';

@Component({
  selector    : 'page-branch-details',
  templateUrl : 'branch-details.html',
  providers   : [BranchService]
})
export class BranchDetailsPage {
  @ViewChild(Content)       content     : Content;
  @ViewChild('contentList') contentList : ElementRef;

  public color      = 'primary';
  public title      = '';
  public opacity    = 'style= "opacity: 0"';
  public hasBorder  = '';

  public id         : number;
  public branch     : Branch; 
  public showSpinner: boolean = true;
  public pictures = [
    {id:1 , url: "http://lorempixel.com/300/300/city/"},
    {id:2 , url: "http://lorempixel.com/300/300/city/"},
    {id:3 , url: "http://lorempixel.com/300/300/city/"},
    {id:4 , url: "http://lorempixel.com/300/300/city/"},
    {id:5 , url: "http://lorempixel.com/300/300/city/"}
  ];

  constructor(
  private zone      : NgZone,
  public  navCtrl   : NavController,
  private navParams : NavParams,
  private $branch   : BranchService) {  	
  }  



  public get(id: number): void{
    let params : Object = {
      include : 'images',
      id      : id
    }

    this.$branch.get(params).then(
      data => {
        this.branch     = <Branch> data;
        this.pictures    = this.pictures;//this.branch.images.data;
        this.showSpinner = false;
      });
    
  }





  // COMPONENTS -------------------------------------------
  public goOrderCreate(branchId: number): void{
    this.navCtrl.push(OrderCreatePage, {id: branchId});
  }









  // OTHERS -------------------------------------------------
  public verifyScroll(){
    let header  = 56;
    let content = this.contentList.nativeElement.offsetTop;
    let result  = this.content.scrollTop.valueOf() - content;
    /*let opacity = (this.content.scrollTop.valueOf() - content)/100;
    this.opacity = 'style= "opacity: ' + opacity + '"';*/


    if(result > 0) {
      this.zone.run(() => {
        if(result > 55){
          this.title = this.branch.establishment.data.name;
          this.hasBorder = 'no-border';
        }
        else{
         this.title = ''; 
        }
        this.color = 'dark';
        StatusBar.backgroundColorByHexString('#222');
      });
    }
    else{
      this.zone.run(() => {
        this.color = 'primary';
        StatusBar.backgroundColorByHexString('#a01b1b');
        this.title = '';
      });
    }
  }




  //VIEW ------------------------------------------------------
  public ionViewDidEnter(){
    this.id = this.navParams.get('id');
    this.get(this.id);

    StatusBar.backgroundColorByHexString('#a01b1b');
  }

  public ionViewWillLeave(){
    StatusBar.backgroundColorByHexString('#a01b1b');
  }



}
