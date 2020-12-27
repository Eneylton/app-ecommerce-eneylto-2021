import { Component } from '@angular/core';
import { AlertController, App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  total: any;
  nome: string = "";
  id: any;
  valor_venda: any;
  produtos_id: any;
  qtd: any;
  items: Array<any> = [];
  produtos: any = [];
  qtd_produto: number = 0;
  log: any;
  usuario_id: any;
  nome_id: any;
  email_id: any;
  endereco_id: any;
  numero_id: any;
  bairro_id: any;
  cidade_id: any;
  estado_id: any;
  genero_id: any;

  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    private appCtrol: App,
    public toastyCrtl: ToastController,
    public navParams: NavParams, public cart: CartProvider) {
  }


  ngOnInit(): void {
    this.storage.get('session_storage').then((res) => {

      this.log = res;
      this.usuario_id = this.log.id;
      this.nome_id = this.log.nome;
      this.email_id = this.log.email;
      this.endereco_id = this.log.endereco
      this.numero_id = this.log.numero
      this.bairro_id = this.log.bairro
      this.cidade_id = this.log.cidade
      this.estado_id = this.log.estado
      this.genero_id = this.log.genero

    });


    this.total = this.cart.total;

    this.cart.items.forEach(item => {
      this.nome = item.nome;
      this.produtos_id = item.id;
      this.valor_venda = Number(item.valor_venda);
    });

    this.listarProdutos();

  }

  listarProdutos() {

    let body = {

      id: this.produtos_id,
      crud: 'listar-produtos-atualizar'
    }

    this.serve.postData(body, 'produtos.php').subscribe((data: any) => {

      for (let i = 0; i < data.result.length; i++) {

        this.produtos.push({

          id: data.result[i]["id"],
          estoque: data.result[i]["estoque"]

        })

        this.qtd_produto = data.result[i]["estoque"];

      }

    })


  }


  finalizar() {
    this.cart.items.forEach(item => {
      let body2 = {

        produtos_id: item.id,
        estoque: Number(this.qtd_produto) - Number(item.qtd),
        crud: 'atualizar-produtos'
      };

      this.serve.postData(body2, 'produtos.php').subscribe(data => {

      });

      let body = {

        produtos_id: item.id,
        nome: item.nome,
        qtd: item.qtd,
        valor: Number(item.valor_venda),
        usuario_id: this.usuario_id,
        crud: 'add-item'
      };

      this.serve.postData(body, 'produtos.php').subscribe(data => {

      });

    })
    this.showInsertOk();
  }



  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu pedido foi enviado com sucesso !!!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Sucesso',
          handler: () => {

            this.navCtrl.setRoot('ProdutoVitrinePage')
          }
        }
      ]
    });
    alert.present();
  }

  openProdutos(){

    this.navCtrl.push('ProdutoVitrinePage');
  }

  logaout() {
    this.storage.clear();
    this.appCtrol.getRootNav().setRoot('LoginPage');

    const toast = this.toastyCrtl.create({
      message: 'Você Encerrou sua sessão !!',
      duration: 3000
    });
    toast.present();

  }

}
