import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {


  limit: number = 3500;
  start: number = 0;

  barra: string = "";

  produtos: any = [];
  scanerData: any = {};

  url: string = "";

  todos: Array<{ id: any, nome: string }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
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
      };
      this.serve.postData(body, 'produtos.php').subscribe((data: any) => {

        for (let i = 0; i < data.result.length; i++) {

          this.produtos.push({
            id: data.result[i]["id"],
            codigo: data.result[i]["codigo"],
            barra: data.result[i]["barra"],
            nome: data.result[i]["nome"],
            estoque: data.result[i]["estoque"],
            qtd: data.result[i]["qtd"],
            valor_compra: data.result[i]["valor_compra"],
            valor_venda: data.result[i]["valor_venda"],
            foto: data.result[i]["foto"]



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
      this.produtos = this.todos.filter((produto) => {
        return (produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.produtos = this.todos;
    }
  }

  adicionar() {

    this.navCtrl.push('ProdutoInsertPage');
  }

  editar(id,
    codigo,
    barra,
    nome,
    qtd,
    estoque,
    valor_compra,
    valor_venda,
    foto) {

    this.navCtrl.push('ProdutoEditPage', {
      id: id,
      codigo: codigo,
      barra: barra,
      nome: nome,
      qtd: qtd,
      estoque: estoque,
      valor_compra: valor_compra,
      valor_venda: valor_venda,
      foto: foto

    })

  }

  detalhe(id,
    codigo,
    barra,
    nome,
    qtd,
    estoque,
    valor_compra,
    valor_venda,
    foto) {

    this.navCtrl.push('ProdutoDetalhePage', {
      id: id,
      codigo: codigo,
      barra: barra,
      nome: nome,
      qtd: qtd,
      estoque: estoque,
      valor_compra: valor_compra,
      valor_venda: valor_venda,
      foto: foto

    })
  }

  delete(id) {
    let body = {
      id: id,
      crud: 'deletar'
    }

    this.serve.postData(body, 'produtos.php').subscribe(data => {
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
            this.navCtrl.setRoot('ProdutoListPage')
          }
        }
      ]
    });
    alert.present();
  }

}