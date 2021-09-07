import React from 'react';
import Button from '@material-ui/core/Button';


class ButtonFunction extends React.Component {
  render() {
    return (
      <Button variant="contained" color="secondary">
        { this.props.children }
      </Button>
    );
  }
}

export default ButtonFunction;