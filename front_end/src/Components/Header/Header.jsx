import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class Header extends React.Component {
  render() {
    return(
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            { this.props.children }
          </IconButton>
          <Typography variant="h6">
          </Typography>
          <Button color="inherit">{ this.props.title }</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;