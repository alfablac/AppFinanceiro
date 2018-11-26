import { ControlePage } from './../controle/controle';
import { ControleProvider } from './../../providers/controle/controle';
import { Controle } from './../../model/controle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalControlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-controle',
  templateUrl: 'modal-controle.html',
})
export class ModalControlePage {

  view: any;

  classeControle:Controle


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    private providerControle:ControleProvider,
    private toast :ToastController
    
  ) {
    
   
    this.classeControle = new Controle();
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
        this.toast.create({ message: 'Controle salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
        this.navCtrl.push(ControlePage);
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar controle.', duration: 3000, position: 'botton' }).present();
      });
   
  }

  private salvarConta() {
   
      return this.providerControle.insert(this.classeControle);
      
  }
  

}
