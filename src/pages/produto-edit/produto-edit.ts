import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage({})
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})


export class ProdutoEditPage {

  
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public toastyCrtl: ToastController,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController) {

      this.url = serve.serve;
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

  scan(){

    this.barcodeScanner.scan().then((data)=>{

      this.scanerData = data;

    }, (err) => {

      console.log("error: ", err );
      
    });
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Abrir Midia',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.abrirCamrera();
          }
        }, {
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.abrirGaleria();
          }
  
        }
      ]
    });
  
    actionSheet.present();
  }
  
  
  abrirCamrera() {
  
    const options: CameraOptions = {
      quality: 100,
      targetWidth:650,
      targetHeight:650,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
  
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
  
      console.log(err);
  
    });
  
  }
  
  
  abrirGaleria() {
  
    const options: CameraOptions = {
      quality: 100,
      targetWidth:650,
      targetHeight:650,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
  
    });
  
  }


  editar(){

    if(this.cameraData === ''){

    let body ={
    id: this.id,
    codigo: this.codigo,
    barra: this.barra,
    nome: this.nome,
    qtd: this.qtd,
    estoque: this.estoque,
    valor_compra: this.valor_compra,
    valor_venda: this.valor_venda,
    foto: this.foto,
    crud: 'edit-produtos2'
    };
    
    this.serve.postData(body, 'produtos.php').subscribe((data:any) =>{
      
      this.showInsertOk();
      
    });
    
    
  }else{

    let body ={
    id: this.id,
    codigo: this.codigo,
    barra: this.barra,
    nome: this.nome,
    qtd: this.qtd,
    estoque: this.estoque,
    valor_compra: this.valor_compra,
    valor_venda: this.valor_venda,
    foto: this.cameraData,
    crud: 'edit-produtos'
    };

    this.serve.postData(body, 'produtos.php').subscribe((data:any) =>{
    
      this.showInsertOk();
    
    });
  
  }
  
  }

  

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
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