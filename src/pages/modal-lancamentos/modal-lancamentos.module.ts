import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLancamentosPage } from './modal-lancamentos';

@NgModule({
  declarations: [
    ModalLancamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLancamentosPage),
  ],
})
export class ModalLancamentosPageModule {}
