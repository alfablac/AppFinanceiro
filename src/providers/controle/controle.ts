import { Controle } from './../../model/controle';
import { DatabaseProvider } from './../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ControleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControleProvider {

 
  list:any = [];


  constructor(private dbProvider:DatabaseProvider) {
    
   dbProvider.criarDatabase();

  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from controle';
     
    return db.executeSql(sql, [])

    .then((data: any) => {
      if(data.rows.length > 0){
        let contas: any[] = [];

        for(var i=0; i < data.rows.length; i++){
          var conta = data.rows.item(i);
          contas.push(conta);
        }
        return contas;

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }

  insert(conta:Controle){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'insert into controle (descricao) values (?)';
    let data = [conta.descricao];
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
    let sql = 'delete from controle where id = ?';
    let data = [id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e)); 
  }


}
