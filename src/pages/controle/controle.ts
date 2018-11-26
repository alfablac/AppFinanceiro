import { Controle } from './../../model/controle';
import { ModalControlePage } from './../modal-controle/modal-controle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { ContasProvider } from '../../providers/contas/contas';

/**
 * Generated class for the ControlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-controle',
  templateUrl: 'controle.html',
})
export class ControlePage {


  listaControles: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public providerContas: ContasProvider,
    public modalCtrl: ModalController,
    private toast: ToastController,
    
  ) {
    this.getAllControles();
  }

  ionViewDidEnter() {
   this.getAllControles();
  }

  public getAllControles(){
    this.providerContas.getAll()
    .then((result:any)=>{
      this.listaControles = result;

    })
    .catch(()=>{
    this.toast.create({message: 'Erro ao carregar categorias', duration:3000, position: 'button'}).present();
    })
  }


  insert(){
    let modal = this.modalCtrl.create(ModalControlePage);
    
    modal.present();
  }


  remover(conta:Controle){
    this.providerContas.remove(conta.id)
    .then(() => {
     var index = this.listaControles.indexOf(conta);
     this.listaControles.splice(index, 1);
     this.toast.create({message: 'Forma Removida.', duration: 3000, position:'botton'}).present();
    } );

  }

  edit(id:number){
    let modal = this.modalCtrl.create(ModalControlePage, {id});
     
     modal.present();
     
   }

  
  public cancel() {
    let navController: NavController = this.navCtrl;
    if (navController.parent) {
      navController = navController.parent;
    }
    navController.first().dismiss();
  }
}
