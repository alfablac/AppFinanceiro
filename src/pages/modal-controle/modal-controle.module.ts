import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalControlePage } from './modal-controle';

@NgModule({
  declarations: [
    ModalControlePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalControlePage),
  ],
})
export class ModalControlePageModule {}
