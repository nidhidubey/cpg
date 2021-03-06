import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../Classes/Models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get('product');

    // this.product.status==='Installed' && setTimeout(() => {
    //   this.showWarrantyExpireAlert();
    // }, 1000);
  }

  openReportIncidentPage() {
    this.navCtrl.push('AddIncidentPage', { 'product': this.product });
  }

  openFeedbackPage() {
    this.navCtrl.push('FeedbackPage');
  }

  // showWarrantyExpireAlert(){
  //   const alert = this.alertCtrl.create({
  //     title:'Warranty Expire',
  //     subTitle:"This product's warranty is about to expire in 1 month. Warranty renewal is recommended.",
  //     buttons:[{
  //       text:'Cancel',
  //       role:'cancel'
  //     },{
  //       text:'Renew Now',
  //       handler:()=>{}
  //     }]
  //   });

  //   alert.present();
  // }

  giveWarranty(endDate: string | null) {

    // if endDate is null
    if (!endDate) { return 'N.A' }

    const ed = new Date(endDate);
    ed.setHours(0);
    ed.setMinutes(0);
    ed.setSeconds(0);
    ed.setMilliseconds(0);

    const today = new Date();
    if (today < ed) {
      return `Expires on ${ed.toLocaleDateString()}`;
    } else {
      return 'Expired';
    }
  }

}
