import Button from '@material-ui/core/Button'

export const CommonButton = (props: any) => {
  const { children } = props;

  return (
    <>
      <Button>{ children }</Button>
    </>
  )
}