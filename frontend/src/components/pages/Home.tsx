import React, { useContext } from "react"

import { AuthContext } from "App"

export const Home = () => {
  //Appで定義したグローバル変数
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {
        isSignedIn && currentUser? (
          <>
            <h2>メールアドレス: {currentUser?.email}</h2>
            <h2> 名前: {currentUser?.name}</h2>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}