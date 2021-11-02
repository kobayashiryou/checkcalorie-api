import TextField from '@material-ui/core/TextField'

export const CommonTextField = (props: any) => {
  const { children } = props;

  return (
    <>
      <TextField>{ children }</TextField>
    </>
  )
}