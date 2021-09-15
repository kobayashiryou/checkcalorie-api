import client from "lib/api/client"
import Coockies from "js-cookie"

import { SignUpData, SignInData } from "interfaces/index"
//新規登録
export const signUp = (data: SignUpData) => {
  //SignUp関数を実行した場合、baseURL/authをpostメソッドでdataを送る
  return client.post("auth",data)
}

//ログイン
export const signIn = (data: SignInData) => {
  //signIn関数を実行した場合、postメソッドでdataを送る
  return client.post("auth/sign_in", data)
}

//ログアウト
export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    //headersから以下の情報を消すことでログアウトできる,以下の値はログイン時に付与される
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }})
}

//認証済みユーザーを取得
export const getCurrentUser = () => {
  if ( !Coockies.get("_access_token") || !Coockies.get("_client") || !Coockies.get("_uid")) return
  return client.get("/users", { headers: {
    "access-token": Coockies.get("_access_token"),
    "client": Coockies.get("_client"),
    "uid": Coockies.get("_uid")
  }})
}