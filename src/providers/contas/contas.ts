import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Conta } from '../../model/conta';

/*
  Generated class for the ContasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContasProvider {
  
  list:any = [];


  constructor(private dbProvider:DatabaseProvider) {
    
   dbProvider.criarDatabase();

  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from contas';
     
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

  insert(conta:Conta){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
    let sql = 'insert into contas (descricao) values (?)';
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
    let sql = 'delete from contas where id = ?';
    let data = [id];
    return db.executeSql(sql, data)
  
    .catch((e) => console.error(e));

    })
  .catch((e) => console.error(e)); 
  }


}



