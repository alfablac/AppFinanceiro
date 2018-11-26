import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentosPage } from './lancamentos';
import { PipesModule } from './../../pipes/pipes.module';


@NgModule({
  declarations: [
    LancamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentosPage),
    PipesModule
  ],
})
export class LancamentosPageModule {}
