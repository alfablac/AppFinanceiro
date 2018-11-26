import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LancamentosProvider } from '../../providers/lancamentos/lancamentos';
import { ContasProvider } from '../../providers/contas/contas';
import { LancamentosPage } from '../lancamentos/lancamentos';
import { Lancamentos } from '../../model/lancamentos';

/**
 * Generated class for the ModalLancamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-lancamentos',
  templateUrl: 'modal-lancamentos.html',
})
export class ModalLancamentosPage {

  view: any;

  classe:Lancamentos;
  listaContas: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public providerContas:ContasProvider,
    private toast:ToastController,
    private providerLancamentos:LancamentosProvider
  ) {

    this.classe = new Lancamentos();
    this.getAllContas();

    if(this.navParams.data.id){
      this.providerLancamentos.get(this.navParams.data.id)
      .then((result:any)=>{
          this.classe = result;
      });
    }
  }

  cancel() {
    let navController: NavController = this.navCtrl;
    if (navController.parent) {
      navController = navController.parent;
    }
    navController.first().dismiss();
  }


  ionViewDidLoad() {
  
  }


  salvar() {
    this.salvarConta()
      .then(() => {
        this.toast.create({ message: 'lançamento salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
        this.navCtrl.push(LancamentosPage);
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o Lançamento.', duration: 3000, position: 'botton' }).present();
      });
   
  }


  private salvarConta() {
   
    if (this.classe.id) {
      return this.providerLancamentos.update(this.classe);
    } else {
      return this.providerLancamentos.insert(this.classe);
    }
      
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

}
