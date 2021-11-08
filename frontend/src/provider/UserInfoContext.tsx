import { createContext } from 'react'

import { getCurrentUser } from "../lib/api/auth"

export const UserContext = createContext({});

export const UserInfoContext = (props: any) => {
  const { chirdren } = props;

  const UserInfo = async () => {
    return getCurrentUser();
  }

  return (
    < UserContext.Provider value={UserInfo} >
      { chirdren }
    </ UserContext.Provider>
  );
}