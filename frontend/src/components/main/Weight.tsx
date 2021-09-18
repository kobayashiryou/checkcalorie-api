import React, { useState, useEffect } from "react"

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"



import { WeightData, WeightDate } from "../../interfaces"
import { createWeight, deleteWeight } from "../../lib/api/weights"
import { getWeights } from "../../lib/api/weights"
import { Graph } from "components/utils/Graph"




export const Weight = () => {

  const selectDate = new Date();
  const [ date, setDate ] = useState<Date | null>(selectDate);
  const [ kg, setKg ] = useState<string>("");
  const [ weights, setWeights ] = useState<WeightData []>([])
  const [ loading, setLoading ] =useState<boolean>(true)


  const indexWeights = async () => {

    try {
      const monthDate: WeightDate = {
        date: date,
      }
      const res = await getWeights (monthDate);
      console.log(res)

      if(res?.status === 200) {
        setWeights(res.data)
      }
    } catch(err) {
      console.log(err)
    }

    setLoading(false)
  }
  const weightItems = weights.map((weight, index) => {
    return <li key={ index }>{weight.kg}</li>
  })


  const handleChange = (date: Date | null) => {
    setDate(date);
  }

  const deleteSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await deleteWeight;
      console.log(res);
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
            <span>{weightItems}</span>
            <Button
              type="submit"
              color="secondary"
              onClick={deleteSubmit}
            >削除
            </Button>
            <Graph />
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}