import React, { useContext, useState } from "react"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import { AuthContext } from "../../App"
import { WeightData } from "../../interfaces"
import { createWeight } from "../../lib/api/weights"

export const Weight = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const selectDate = new Date();
  const [ date, setDate ] = useState(selectDate);
  const [ kg, setKg ] = useState<number>();


  const handleChange = (date: any) => {
    setDate(date);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: WeightData = {
      date: date,
      kg: kg,
      userId: currentUser?.id
    }

    try {
      const res = await createWeight(data);
      console.log(res);

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <DatePicker
              selected={date}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              required
              label="体重"
              value={kg}
              onChange={event => setKg(Number(event.target.value))}
            />
            <Button
              type="submit"
              color="primary"
              onClick={handleSubmit}
            >登録
            </Button>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}