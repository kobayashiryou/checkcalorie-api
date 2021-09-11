import React, { useEffect, useState } from 'react';
import { execTest } from "lib/api/test"

export const Test: React.FC = () => {
  //stateとは条件によって変わる値
  //setMessageが値を更新していく   userState(初期値)になる、この場合から文字列が初期値にセットされている
  const [message, setMessage] = useState<string>("") //分割代入[好きな値, set好きな値]
  //asyncは非同期処理するときに使うawait(then的な役割)とセットで使う
  const handleExecTest = async () => {
    //execTest(/testを実行した結果、railsのTestControllerのindexメソッドのmesage:"hello~"が帰って来るはず)を実行した結果をresに収納
    const res = await execTest();
    //もしstatusが200ならmessageの値を初期値からres.data.messageに変更する（空欄からmesage:"hello~"）
    if(res.data.status === 200){
      setMessage(res.data.message)
    }
  }

  useEffect(() => {
    handleExecTest();
  },[])
  //useEffectは再レンダリング(stateが変わるとこの関数をまた上から繰り返してしまう)されないようにしたいときに使ったりする。
  //関数が多くなってきた時に互いに反応してうまく作動しなくなることがある
  //今回の場合だとuseEffectでhandleExecTest()を実行したあとはレンダリングしないようになっている
  return (
    <h1>{ message }</h1>
  )
}
