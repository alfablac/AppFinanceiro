import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { SaldoPage } from '../pages/saldo/saldo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  home:any = HomePage;
  //contas:any = ContasPage;
  //lancamentos:any = LancamentosPage;
  //saldo:any = SaldoPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
    
     this.rootPage = this.home;
    });
  }

  openPage(opcao){
    this.rootPage = opcao;
  }
}
