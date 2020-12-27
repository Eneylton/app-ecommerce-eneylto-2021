import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  brightness: number = 20;
  contrast: number = 0;
  warmth: number = 1300;
  structure: any = { lower: 10, upper: 50 };
  text: number = 0;
  url:            string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,private serve: ServiceProvider,
    public cart: CartProvider) {
      this.url = serve.serve;
      console.log(this.serve);

  }


  removeItem(index) {
    this.cart.removeItem(index);
  }


  mais(item) {
    this.cart.mais(item);
  }

  menos(item) {
    this.cart.menos(item);
  }

 
  calculateTotal() {
    this.cart.calculateTotal();
  }

  totalCarrinho(){
    this.cart.totalCarrinho();
  }

  produtoTotal() {
  this.cart.produtoTotal();
  }


}
