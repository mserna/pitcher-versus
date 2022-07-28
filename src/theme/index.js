import { createMuiTheme } from '@material-ui/core';
import typography from './typography';

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3B2F66',
    },
  },
  typography,
});

export default MuiTheme;