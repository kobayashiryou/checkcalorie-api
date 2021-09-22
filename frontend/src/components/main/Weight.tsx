import React, { useState, useEffect } from "react"

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart';
import Paper from '@material-ui/core/Paper';




import { selectWeight, WeightData } from "../../interfaces"
import { createWeight, deleteWeight } from "../../lib/api/weights"
import { getWeights } from "../../lib/api/weights"
import { domainToASCII } from "url"





export const Weight = () => {

  const selectDate = new Date();
  const [ date, setDate ] = useState<Date | null>(selectDate);
  const [ kg, setKg ] = useState<string>("");
  const [ weights, setWeights ] = useState<selectWeight []>([])
  const [ loading, setLoading ] =useState<boolean>(true)



  const indexWeights = async () => {

    try {

      const res = await getWeights ();
      console.log(res)

      if(res?.status === 200) {
        setWeights(res.data)
      }
    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }


  const handleChange = (date: Date | null) => {
    setDate(date);
  }

  const deleteSubmit = async (id: number) => {

    const data: selectWeight = {
      id: id,
      date: null,
      kg: ""
    }

    try {
      const res = await deleteWeight(data.id);
      console.log(res);

      indexWeights();
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: WeightData = {
      date: date,
      kg: kg
    }


    try {
      const res = await createWeight(data);
      console.log(res);

      indexWeights();

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    indexWeights();
  }, []);



  return (
    <>
      {
        !loading ? (
          <>
            <TextField
              variant="outlined"
              required
              label="体重"
              value={kg}
              onChange={event => setKg(event.target.value)}
            />

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
            <Button
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >登録
            </Button>
            <ul>
              {
                weights.map((weight) =>
                <li key={ weight.id }>{weight.kg}
                  <Button
                    type="submit"
                    onClick={() => deleteSubmit(weight.id)}
                  >
                    削除
                  </Button>
                </li>
                )
              }
            </ul>
            <Paper>
              <Chart
                data={weights}
              >
                <ValueScale name="kg" modifyDomain={()=>[0,100]}/>
                <ArgumentScale name="date" modifyDomain={()=>[]}/>
                <ArgumentAxis />
                <ValueAxis scaleName="kg" showTicks/>
                <SplineSeries valueField="kg" argumentField="date" scaleName="kg" />
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
        ) : (
          <></>
        )
      }
    </>
  )
}