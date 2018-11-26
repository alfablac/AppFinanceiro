import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ToastController, ViewController } from 'ionic-angular';
import { ContasProvider } from '../../providers/contas/contas';
import { ContasPage } from '../contas/contas';
import { Conta } from '../../model/conta';

@IonicPage()
@Component({
  selector: 'page-modal-contas',
  templateUrl: 'modal-contas.html',
})
export class ModalContasPage {

  view: any;

  classeConta:Conta


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    private providerContas:ContasProvider,
    private toast :ToastController
    
  ) {
    
   
    this.classeConta = new Conta();
  }

  public cancel() {
    let navController: NavController = this.navCtrl;
    if (navController.parent) {
      navController = navController.parent;
    }
    navController.first().dismiss();
  }

  salvar() {
    this.salvarConta()
      .then(() => {
        this.toast.create({ message: 'Conta salva.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
        this.navCtrl.push(ContasPage);
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a conta.', duration: 3000, position: 'botton' }).present();
      });
   
  }

  private salvarConta() {
   
      return this.providerContas.insert(this.classeConta);
      
  }


}