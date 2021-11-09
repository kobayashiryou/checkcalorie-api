import React, { useState, useEffect, useContext } from "react"

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

import { selectWeight, WeightData } from "../../interfaces"
import { createWeight, updateWeight } from "../../lib/api/weights"
import { getWeights } from "../../lib/api/weights"
import { Graph } from "components/utils/Graph"
import { WeightIndex } from "components/utils/WeightIndex"
import { UserContext } from "provider/UserInfoContext"



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Weight = () => {

  const selectDate = new Date();
  const [ date, setDate ] = useState<Date | null>(selectDate);
  const [ kg, setKg ] = useState<string>("");
  const [ weights, setWeights ] = useState<selectWeight []>([])
  const [ loading, setLoading ] =useState<boolean>(true)
  const [ open, setOpen ] = useState(false);
  const userInfomation = useContext(UserContext);

  const indexWeights = async () => {
    console.log(userInfomation);

    try {

      const res = await getWeights ();

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


  const updateSubmit = async (id: number, data: WeightData) => {
    const selectData: selectWeight = {
      id: id,
      date: null,
      kg: ""
    }

    const updateData: WeightData = {
      date: date,
      kg: kg
    }

    try {
      const res = await updateWeight(selectData.id, updateData);
      console.log(res);
      indexWeights();
    } catch (err) {
      console.log(err);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
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
                margin="normal"
                label="登録年月日"
                format="MM/dd/yyyy"
                id="date-picker-dialog"
                value={date}
                onChange={handleChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <Button
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >登録
            </Button>
            <WeightIndex WeightData={weights}/>
            <Graph weightsData={weights}/>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}