import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LancamentosProvider } from '../../providers/lancamentos/lancamentos';

/**
 * Generated class for the SaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {

  saldo: number;

  constructor(
    public events: Events,
    private dao: LancamentosProvider
  ) {

  }

  ngOnInit() {
    this.dao.getSaldo((saldo) => {
      this.saldo = saldo;
    });
    this.events.subscribe("saldo:updated", (saldo) => {
      this.saldo = parseFloat(saldo);
    });
  }


}
