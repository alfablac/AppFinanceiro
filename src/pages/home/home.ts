import { LancamentosProvider } from './../../providers/lancamentos/lancamentos';
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public events: Events,
    private dao: LancamentosProvider) {
    
  }

  saldo: number;


  ngOnInit() {
    this.dao.getSaldo((saldo) => {
      this.saldo = saldo;
    });
    this.events.subscribe("saldo:updated", (saldo) => {
      this.saldo = parseFloat(saldo);
    });
  }

  abrirSaldo(){
    
    this.navCtrl.push('SaldoPage');
  }

  abrirContas(){
    this.navCtrl.push('ContasPage');
  }

  abrirLancamentos(){
    this.navCtrl.push('LancamentosPage');
  }

  abrirControles(){
    this.navCtrl.push('ControlePage');
  }

}
