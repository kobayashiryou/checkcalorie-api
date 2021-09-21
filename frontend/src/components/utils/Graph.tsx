import React, {useState, useEffect} from "react"
import Paper from '@material-ui/core/Paper';

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

import { getWeights } from "lib/api/weights"
import { WeightData } from "interfaces";



export const Graph = () => {
  const selectDate = new Date();
  const [ weights, setWeights ] = useState<WeightData []>([])
  const [ maxWeight, setMaxWeight ] = useState<string>("")
  const [ date, setDate ] = useState<Date | null>(selectDate)

  const handleChange = (date: Date | null) => {
    setDate(date);
  }

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

  // setMaxWeight(weights.reduce((a,b) => a.kg > b.kg?a:b).kg)
  // const modifyKgDomain = () => [0, parseFloat(maxWeight)+20]

  useEffect(() => {
    indexWeights();
  }, []);

  return (
    <>
      <Paper>
        <Chart
          data={weights}
        >
          <ValueScale name="kg" modifyDomain={()=>[0,100]}/>
          <ArgumentAxis />
          <ValueAxis scaleName="kg" showGrid={false} showLine showTicks/>
          <SplineSeries name="体重変化" valueField="kg" argumentField="date" scaleName="kg" />
          <Animation />
          <Legend />
        </Chart>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="登録年月日"
            format="MM/dd/yyyy"
            id="date-picker-dialog"
            value={date}
            onChange={handleChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          </MuiPickersUtilsProvider>
      </Paper>
    </>
  )
}