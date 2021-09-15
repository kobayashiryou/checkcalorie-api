import React, {useState, useContext, useEffect} from "react"
import Paper from '@material-ui/core/Paper';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

import { getWeights } from "lib/api/weights"
import { WeightData } from "interfaces";
import { AuthContext } from "App"

export const Graph = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const [ weights, setWeights ] = useState<WeightData []>([])

  useEffect(() => {
    indexWeights();
  }, []);

  const indexWeights = async () => {

    try {
      const res = await getWeights ()
      console.log(res)

      if(res?.status === 200) {
        setWeights(res.data)
      }
    } catch(err) {
      console.log(err)
    }
  }
  const weightItems = weights.map((weight) => {
    return <li>{weight.kg}</li>
  })

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <ul>{weightItems}</ul>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}