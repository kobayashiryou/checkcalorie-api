//新規登録
export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

//ログイン
export interface SignInData {
  email: string
  password: string
}

//ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname: string
  image: string
  allowPassword: boolean
}

//体重
export interface WeightData {
  date: Date | null
  kg: string
}