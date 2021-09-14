import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

//refとは、idとかの属性値。相違点としては、Componentの中だけのことなので、影響を気にせず使える
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  //...スプレッド構文
})

interface AlertMessageProps {
  open: boolean
  setOpen: Function
  severity: "error" | "success" | "info" | "warning"
  message: string
}

export const AlertMessage = ({ open, setOpen, severity, message}: AlertMessageProps) => {
  const handleColseAlertMessage = (e?: React.SyntheticEvent, reason?: string) => {
    if(reason === "clickaway") return
    setOpen(false)
  }
  return(
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        onClose={handleColseAlertMessage}
      >
        <Alert onClose={handleColseAlertMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}