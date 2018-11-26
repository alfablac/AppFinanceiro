import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContasPage } from './modal-contas';

@NgModule({
  declarations: [
    ModalContasPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalContasPage),
  ],
})
export class ModalContasPageModule {}
