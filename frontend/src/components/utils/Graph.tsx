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

export const Graph = () => {

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
  const weightItems = weights

  return (
    <>
      <Paper>
        <Chart
          data={weightItems}
        >
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="kg" argumentField="date" />
        </Chart>
      </Paper>
    </>
  )
}