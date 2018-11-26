import { Controle } from './../../model/controle';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

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
        let controles: any[] = [];

        for(var i=0; i < data.rows.length; i++){
          var controle = data.rows.item(i);
          controles.push(controle);
        }
        return controles;

      }else{
        return [];
      }
    })
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e));
  }

  insert(controle:Controle){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'insert into controle (descricao) values (?)';
    let data = [controle.descricao];
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
