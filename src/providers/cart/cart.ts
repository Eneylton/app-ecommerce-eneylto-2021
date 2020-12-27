import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "ionic-angular";

@Injectable()
export class CartProvider {
    items: Array<any> = [];
    total = 0;
    sum = 0;
    valor = 0;
    totalProduto = 0;
    carrinhoTotal = 0;


    constructor(
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {


    }

    addItem(item) {
        let possion = this.items.findIndex(produto => produto.id == item.id);
        if (possion == -1) {
            this.items.push(item);
            this.calculateTotal();
            this.produtoTotal();
            this.totalCarrinho();
        }


    }

   

    mais(item) {
       
        let possion = this.items.findIndex(produto => produto.id == item.id);
        if (possion != -1) {
            this.items[possion].qtd++;
           
            this.calculateTotal();
            this.produtoTotal();
        }
        
    }

    menos(item) {
        let possion = this.items.findIndex(produto => produto.id == item.id);
        if (possion != -1) {
            this.items[possion].qtd--;
            if(this.items[possion].qtd < 1){
                
                this.removeItem(possion);
                this.calculateTotal();
                
            }
            this.calculateTotal();
            this.produtoTotal();
        }
       
    }



    removeItem(index) {
        this.items.splice(index, 1);
        this.calculateTotal();
        this.produtoTotal();
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach(item => {
            total += Number(item.valor_venda * item.qtd);
        });
        this.total = total;
    }

    produtoTotal() {
        let totalProduto = 0;
        this.items.forEach(item => {
            totalProduto += Number(item.qtd);
        });
        this.totalProduto = totalProduto;
    }

    totalCarrinho(){

        let carrinhoTotal = 0;
        this.items.forEach(item => {
            carrinhoTotal = Number(item.qtd);
        });
        this.carrinhoTotal = this.items.length;
        console.log(carrinhoTotal);

    }

}
