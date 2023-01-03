import * as SQLite from "expo-sqlite";

import dayjs from "dayjs";
/**
 * SQLiteと接続
 */
export const db = SQLite.openDatabase("tapdiary");


/**
 * テーブルを作成する
 */
export function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `CREATE TABLE if not exists diaries(
        id integer primary key not null,
        body text,
        emoji text,
        feel_id text,
        updated_at text,
        created_at text
      );`,
      // SQL文の引数
      // 必要ないときは空のまま
      [],
      // 成功時のコールバック関数
      () => {
        console.log("create table success");
      },
      () => {
        // 失敗時のコールバック関数
        console.log("create table faile");
        return false;
      }
    );
  });
}

/**
 * データを登録する
 */
export function insert(id: number, name: string) {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      // ?のところに引数で設定した値が順番に入る
      `insert into sample_table values (?, ?);`,
      // SQL文の引数
      [id, name],
      // 成功時のコールバック関数
      () => {
        console.log("insert success");
      },
      () => {
        // 失敗時のコールバック関数
        console.log("insert faile");
        return false;
      }
    );
  });
}

export const insertDiary = (db:any ,body:string='' ,selectedTemplate:{id:number,emoji:string}) => {
  const createdAt:string = dayjs().format('YYYY-MM-DD');
  
  db.transaction((tx:any)=>{
    tx.executeSql(
      `INSERT INTO diaries (body,emoji,feel_id,updated_at,created_at) values (?,?,?,?,?);`,
      [body,selectedTemplate.emoji,selectedTemplate.id,createdAt,createdAt],
      (sqlTxn:any,res:any)=>{
        console.log(sqlTxn);
        console.log('Diary added SUCCESS');
        console.log(res);
      },
      (error:Error)=>{
        console.log('ERROR');
        console.log(error);
        
        
      }
    )
  })
  
}


/**
 * データを取得する
 */
export function select() {
  return new Promise((resolve,reject)=>{
    db.transaction((tx) => {
     tx.executeSql(
       // 実行したいSQL文
       `select * from diaries order by id desc limit 5;`,
       // SQL文の引数
       [],
       // 成功時のコールバック関数
       (_, { rows }) => {
         console.log("select success");
         console.log("select result:" + JSON.stringify(rows._array));
         resolve(rows._array)
       },
       (error):any => {
         // 失敗時のコールバック関数
         console.log("select faile");
         console.log(error);
         reject(error)
       }
     );
   });
  })
}
