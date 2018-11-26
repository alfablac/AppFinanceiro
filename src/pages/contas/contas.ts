import { Conta } from './../../model/conta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ModalController,  ToastController } from 'ionic-angular';
import { ContasProvider } from '../../providers/contas/contas';
import { ModalContasPage } from '../modal-contas/modal-contas';

/**
 * Generated class for the ContasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {



  listaContas: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public providerContas: ContasProvider,
    public modalCtrl: ModalController,
    private toast: ToastController,
    
  ) {
    this.getAllContas();
  }

  ionViewDidEnter() {
   this.getAllContas();
  }

  public getAllContas(){
    this.providerContas.getAll()
    .then((result:any)=>{
      this.listaContas = result;

    })
    .catch(()=>{
    this.toast.create({message: 'Erro ao carregar categorias', duration:3000, position: 'button'}).present();
    })
  }


  insert(){
    let modal = this.modalCtrl.create(ModalContasPage);
    
    modal.present();
  }


  remover(conta:Conta){
    this.providerContas.remove(conta.id)
    .then(() => {
     var index = this.listaContas.indexOf(conta);
     this.listaContas.splice(index, 1);
     this.toast.create({message: 'Conta Removida.', duration: 3000, position:'botton'}).present();
    } );

  }

  edit(id:number){
    let modal = this.modalCtrl.create(ModalContasPage, {id});
     
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
