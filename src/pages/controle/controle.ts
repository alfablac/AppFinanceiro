import { ControleProvider } from './../../providers/controle/controle';
import { Controle } from './../../model/controle';
import { ModalControlePage } from './../modal-controle/modal-controle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

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
    public providerControle: ControleProvider,
    public modalCtrl: ModalController,
    private toast: ToastController,
    
  ) {
    this.getAllControles();
  }

  ionViewDidEnter() {
   this.getAllControles();
  }

  public getAllControles(){
    this.providerControle.getAll()
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


  remover(controle:Controle){
    this.providerControle.remove(controle.id)
    .then(() => {
     var index = this.listaControles.indexOf(controle);
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
