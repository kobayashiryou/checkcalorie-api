import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import { CommonLayout } from "components/layouts/CommonLayout"
import { Home } from "components/pages/Home"
import { SignUp } from "components/pages/SignUp"
import { SignIn } from "components/pages/SignIn"


import { User } from "./interfaces/index"
import { getCurrentUser } from "lib/api/auth"


//グローバル変数・関数(この場合、createContext)propsのバケツリレーを防ぐ、どこでも展開できる
export const AuthContext = createContext( { } as {
  loading: boolean
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

export const App: React.FC = () => {
  //useStateは第一引数にstateの値（引数名は自由）,第二引数に更新の値をセットできる。
  //useState("ここに初期値")この場合、loadingに初期値としてfalseが入っている等
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  //asyncは非同期処理、await(then的な役割)とセットで使う
  const handleGetCurrentUser = async () => {
    //handleGetCurrentUser関数が実行された場合、getCurrentUserが実行され、結果は変数resに。
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.status === 200) {
        //もしresが存在していてstatusが200ならば、setIsSignedInでstateの値をtrueに更新する
        setIsSignedIn(true)
        //UserにcurrentUserの値をセット
        setCurrentUser(res?.data.currentUser)
      } else {
        console.log("認証済みのユーザーはいません");
      }
    } catch (err) {
      console.log(err)
    }
    //初期値をfalseに更新
    setLoading(false)
  }
  //不要な再レンダリング防止、handleGetCurrentUser関数はsetCurrentUserにのみ関心を持つ
  useEffect(() => {
    handleGetCurrentUser();
  },[setCurrentUser])

  const Private = ({ children }: { children: React.ReactElement }) => {
    //引数にReact(ルーティングに関する要素?)を指定して、chirdrenに渡している、つまり引数はchildren
    //loadingがされていて、すでにログインしている場合に適切なルーティングを返す
    //それ以外はログインページへリダイレクト
    if(!loading) {
      if(isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Private>
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}
//AuthContext.Provider valueはグローバル変数としてprppsに渡せる
//<Route exact path="/signup" component={SignUp} />はcomponentというpropsを渡すことができる
//exactは正確に一致しているpathのみrouteする、つけないと/だけでも反応してしまう