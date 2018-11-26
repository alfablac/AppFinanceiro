import { PipesModule } from './../../pipes/pipes.module';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Events } from 'ionic-angular';
import { ContasProvider } from '../../providers/contas/contas';
import { LancamentosProvider  } from '../../providers/lancamentos/lancamentos';
import { ModalLancamentosPage } from '../modal-lancamentos/modal-lancamentos';
import { Lancamentos } from './../../model/lancamentos';
/**
 * Generated class for the LancamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage {

  lista: any[] = [];
  saldo: number;
  searchText: string = null;

  constructor(
    public events: Events,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public providerContas: ContasProvider,
    public modalCtrl: ModalController,
    private toast: ToastController,
    public providerLancamentos: LancamentosProvider
  ) {
    this.getAll();
  }

  ionViewDidEnter() {
    this.getAll();
    this.providerLancamentos.getSaldo((saldo) => {
      this.saldo = saldo;
    });
    this.events.subscribe("saldo:updated", (saldo) => {
      this.saldo = parseFloat(saldo);
    });
   }

   
 
   public getAll(){
     this.providerLancamentos.getAll()
     .then((result: any[]) => {
       this.lista = result;
 
     })
     .catch(()=>{
     this.toast.create({message: 'Erro ao carregar lançamentos', duration:3000, position: 'button'}).present();
     })
   }


   public getData(){
    this.providerLancamentos.getData(this.searchText)
    .then((result: any[]) => {
      this.lista = result;

    })
    .catch(()=>{
    this.toast.create({message: 'Erro ao carregar lançamentos', duration:3000, position: 'button'}).present();
    })
  }


   
   edit(id:number){
   let modal = this.modalCtrl.create(ModalLancamentosPage, {id});
    
    modal.present();
    
  }


  insert(){
    let modal = this.modalCtrl.create(ModalLancamentosPage);
    
    modal.present();
  }


  remover(classe:Lancamentos){
    this.providerLancamentos.remove(classe.id)
    .then(() => {
     var index = this.lista.indexOf(classe);
     this.lista.splice(index, 1);
     this.toast.create({message: 'Lançamento Removido.', duration: 3000, position:'botton'}).present();
    } );

  }


  lancamentoEntrada(lancamento) {
    return lancamento.entradaSaida == "entrada";
  }


  filtrar(ev: any){
    this.getData();
  }


  public cancel() {
    let navController: NavController = this.navCtrl;
    if (navController.parent) {
      navController = navController.parent;
    }
    navController.first().dismiss();
  }
}
