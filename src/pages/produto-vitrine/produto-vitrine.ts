import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-produto-vitrine',
  templateUrl: 'produto-vitrine.html',
})
export class ProdutoVitrinePage {

  limit: number = 2500;
  start: number = 0;

  produtos: any = [];

  url: string = "";

  todos: Array<{id:any, nome: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public cart: CartProvider,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.produtos = [];
  this.start = 0;
  this.listarProdutos();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarProdutos() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-produtos'
    }
    
    this.serve.postData(body, 'produtos.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.produtos.push({
              id:            data.result[i]["id"],
              nome:          data.result[i]["nome"],
              valor_venda:   data.result[i]["valor_venda"],
              qtd:           data.result[i]["qtd"],
              estoque:       data.result[i]["estoque"],
              foto:          data.result[i]["foto"]
        });

      }

      })

      this.todos = this.produtos;

      resolve(true);

    });

}


getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((categoria) => {
      return (categoria.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.produtos = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('CategoriaInsertPage');
}

editar(id, descricao){

  this.navCtrl.push('CategoriaEditPage', {
    id:         id,
    descricao:  descricao

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'categoria.php').subscribe(data =>{
    this.showInsertOk();
  });

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('CategoriaListarPage')
        }
      }
    ]
  });
  alert.present();
}

addItem(item){

  let possion = this.cart.items.findIndex(produto => produto.id == item.id);
  if (possion == -1) {

  this.cart.addItem(item);
  let toast = this.toastCtrl.create({
      message: 'Produto adicionado no carrinho',
      duration: 3000
  });
  toast.present();
}else{

  let toast = this.toastCtrl.create({
    message: 'Produto jรก adiiconado....',
    duration: 3000
});
toast.present();


}

}

}


