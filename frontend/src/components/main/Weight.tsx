import React, { useState, useEffect } from "react"

import "date-fns"
import DateFnsUtils from "@date-io/date-fns"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';




import { selectWeight, WeightData } from "../../interfaces"
import { createWeight, deleteWeight, updateWeight } from "../../lib/api/weights"
import { getWeights } from "../../lib/api/weights"
import { Graph } from "components/utils/Graph"


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


  const indexWeights = async () => {

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
            <ul>
              {
                weights.map((weight) =>
                <li key={ weight.id }>{new Date(`${weight.date}`).getDate()}日<br />{weight.kg}
                  <Button
                    type="submit"
                    onClick={() => deleteSubmit(weight.id)}
                  >
                    削除
                  </Button>
                  <Button
                    onClick={handleOpen}
                  >
                    編集
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-description">
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
                          {/* <Button
                            onClick={() => updateSubmit(weight.id)}
                          >
                            編集
                          </Button> */}
                        </MuiPickersUtilsProvider>
                      </Typography>
                    </Box>
                  </Modal>
                </li>
                )
              }
            </ul>
            <Graph weightsData={weights}/>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}