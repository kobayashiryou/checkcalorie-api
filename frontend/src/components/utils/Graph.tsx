import React, {useState, useContext, useEffect} from "react"
import Paper from '@material-ui/core/Paper';

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

import { getWeights } from "lib/api/weights"
import { WeightData, WeightDate } from "interfaces";

export const Graph = () => {
  const selectDate = new Date();
  const [ weights, setWeights ] = useState<WeightData []>([])
  const [ date, setDate ] = useState<Date | null>(selectDate)

  useEffect(() => {
    indexWeights();
  }, []);

  const handleChange = (date: Date | null) => {
    setDate(date);
  }

  const indexWeights = async () => {

    const monthDate: WeightDate = {
      date: date,
    }

    try {
      const res = await getWeights (monthDate)
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