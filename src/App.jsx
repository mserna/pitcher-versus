import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import AppRoutes from './AppRoutes';

const App = () => {
    return(
    <ThemeProvider>
        <AppRoutes />
    </ThemeProvider>
    );
};
  
export default App;