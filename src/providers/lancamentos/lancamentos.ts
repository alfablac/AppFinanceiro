import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Lancamentos } from '../../model/lancamentos';

/*
  Generated class for the LancamentosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LancamentosProvider {

  constructor(private dbProvider:DatabaseProvider) {
    
    dbProvider.criarDatabase();
 
   }


   public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from lancamentos';
     
    return db.executeSql(sql, [])

    .then((data: any) => {
      if(data.rows.length > 0){
        let dados: any[] = [];

        for(var i=0; i < data.rows.length; i++){
          var dado = data.rows.item(i);
          dados.push(dado);
        }
        return dados;

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }



  public getData(dataCad:string = null){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from lancamentos where data like ?';
      var data: any[] = []

     
      data.push('%' + dataCad + '%');
      
    
     
    return db.executeSql(sql, [data])

    .then((data: any) => {
      if(data.rows.length > 0){
        let dados: any[] = [];

        for(var i=0; i < data.rows.length; i++){
          var dado = data.rows.item(i);
          dados.push(dado);
        }
        return dados;

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }



  public getSaldo(obj){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = "SELECT TOTAL(valor) as saldo, entradaSaida FROM lancamentos WHERE pago = 'true' AND entradaSaida = 'entrada' UNION SELECT TOTAL(valor) as saldo, entradaSaida FROM lancamentos WHERE pago = 'true' AND entradaSaida = 'saida' ";
     
    return db.executeSql(sql, [])

    .then((data: any) => {
      if(data.rows.length > 0){
        let saldo = 0;
          if(data.rows.length > 0) {
            for(let i = 0; i < data.rows.length; i++) {
              let item = {
              saldo: data.rows.item(i).saldo,
              entradaSaida: data.rows.item(i).entradaSaida,
              }
              if (item.entradaSaida == 'entrada') {
                saldo += item.saldo;
              } else {
                saldo -= item.saldo;
              }
            }
          }
          obj(saldo);

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }


  



   insert(lancamentos:Lancamentos){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'insert into lancamentos (descricao, valor, data, conta, controle, entradaSaida, pago) values (?, ?, ?, ?, ?, ?, ?)';
    let data = [lancamentos.descricao, lancamentos.valor, lancamentos.data, lancamentos.conta, lancamentos.controle, lancamentos.entradaSaida, lancamentos.pago ];
   
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));  
  }



  edit(conta){

  }


  public remove(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'delete from lancamentos where id = ?';
    let data = [id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e)); 
  }


  public update(classe:Lancamentos){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'update lancamentos set descricao = ?, valor = ?, data = ?, conta = ?, controle = ?, entradaSaida = ?, pago = ? where id = ?';
    let data = [classe.descricao, classe.valor, classe.data, classe.conta, classe.controle, classe.entradaSaida, classe.pago, classe.id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));  
  }



  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'select * from lancamentos where id = ?';
    let data = [id];
    return db.executeSql(sql, data)

    .then((data:any) => {
      if(data.rows.length > 0){
        let item = data.rows.item(0);
        let dado = new Lancamentos();
        dado.id = item.id;
        dado.descricao = item.descricao;
        dado.valor = item.valor;
        dado.data = item.data;
        dado.conta = item.conta;
        dado.controle = item.controle;
        dado.entradaSaida = item.entradaSaida;
        dado.pago = item.pago;
        return dado;
      }
      return null;
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }

  public getUltimo(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'select top 1 * from lancamentos';
    return db.executeSql(sql, [])

    .then((data:any) => {
      if(data.rows.length > 0){
        let item = data.rows.item(0);
        let dado = new Lancamentos();
        dado.id = item.id;
        dado.descricao = item.descricao;
        dado.valor = item.valor;
        dado.data = item.data;
        dado.conta = item.conta;
        dado.controle = item.controle;
        dado.entradaSaida = item.entradaSaida;
        dado.pago = item.pago;
        return dado;
      }
      return null;
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }


}



