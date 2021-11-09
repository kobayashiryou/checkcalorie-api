import DateFnsUtils from "@date-io/date-fns";

import {
  Box, Button, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Theme, createStyles
}
from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { selectWeight } from "interfaces";
import { deleteWeight, getWeights } from "lib/api/weights";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);



export const WeightIndex = (props: any) => {
  const { WeightData } = props;
  const classes = useStyles();
  const [ weights, setWeights ] = useState<selectWeight []>([])
  const [ loading, setLoading ] = useState<boolean>(true)

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


  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>体重</TableCell>
                <TableCell>削除</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {WeightData.map((weight: any) =>
                <TableRow hover role="checkbox" tabIndex={-1} key={weight.id}>
                  <TableCell>
                    {weight.date}
                  </TableCell>
                  <TableCell>
                    {weight.kg}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="submit"
                      onClick={() => deleteSubmit(weight.id)}
                    >
                      削除
                    </Button>
                    {/* <Button
                      onClick={handleOpen}
                    >
                      編集
                    </Button> */}
                    {/* <Modal
                      // open={open}
                      // onClose={handleClose}
                      aria-describedby="modal-modal-description"
                    >
                      <Box className={classes.paper}>
                        <Typography id="modal-modal-description">
                          <TextField
                            variant="outlined"
                            required
                            label="体重"
                            // value={kg}
                            // onChange={event => setKg(event.target.value)}
                          />
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              label="登録年月日"
                              format="MM/dd/yyyy"
                              id="date-picker-dialog"
                              // value={date}
                              // onChange={handleChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date"
                              }}
                            />
                            <Button
                              onClick={() => updateSubmit(weight.id)}
                            >
                              編集
                            </Button>
                          </MuiPickersUtilsProvider>
                        </Typography>
                      </Box>
                    </Modal> */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}