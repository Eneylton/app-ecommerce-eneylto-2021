import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoVitrinePage } from './produto-vitrine';

@NgModule({
  declarations: [
    ProdutoVitrinePage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoVitrinePage),
  ],
})
export class ProdutoVitrinePageModule {}
