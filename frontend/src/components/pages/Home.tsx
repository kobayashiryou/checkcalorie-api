import React, { useContext } from "react"

import { AuthContext } from "../../provider/AuthContext"
import { Weight } from "components/pages/Weight"

export const Home = () => {
  //Appで定義したグローバル変数
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {
        isSignedIn && currentUser? (
          <>
            <Weight />
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}