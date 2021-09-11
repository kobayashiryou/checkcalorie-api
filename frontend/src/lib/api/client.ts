import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケースからキャメルケースの変換する
// 送信する値をキャメルケースからスネークケースに変換
const options = {
  ignoreHeaders: true
}
//httpリクエストのheaderのことかな？
//このbaseURLから始まるAPIを叩いた時のheaderの情報だけはケバブケース（kebab-case）そのままにするってことだと思う
//そのほかについては、applyCaseMiddlewareに基づいて変換してくれる
const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3000/api/v1"
}), options)

export default client