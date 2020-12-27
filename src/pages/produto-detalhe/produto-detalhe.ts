import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})

export class ProdutoDetalhePage {

  id:             number;
  codigo:         string = "";
  barra:          string = "";
  nome:           string = "";
  qtd:            number;
  estoque:        string = "";
  valor_compra:   string = "";
  valor_venda:    string = "";
  foto:           string = "";
  base64Image:    string = "";
  cameraData:     string = "";
  scanerData:     any={};
  url:            string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,  private serve: ServiceProvider) {
    this.url = serve.serve;
    console.log(this.serve);
  }

  ionViewDidLoad() {
    this.id            = this.navParams.get('id');
    this.codigo        = this.navParams.get('codigo');
    this.barra         = this.navParams.get('barra');
    this.nome          = this.navParams.get('nome');
    this.qtd           = this.navParams.get('qtd');
    this.estoque       = this.navParams.get('estoque');
    this.valor_compra  = this.navParams.get('valor_compra');
    this.valor_venda   = this.navParams.get('valor_venda');
    this.foto          = this.navParams.get('foto');
  }

}
