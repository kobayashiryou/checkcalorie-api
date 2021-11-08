import { createContext } from 'react'
import { User } from "../interfaces/index"

//グローバル変数・関数(この場合、createContext)propsのバケツリレーを防ぐ、どこでも展開できる
export const AuthContext = createContext( { } as {
  loading: boolean
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})