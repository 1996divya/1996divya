import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/app';
import init from "dewlinq";
import initstrings from 'dewstrings';


init();
initstrings();



ReactDOM.render(
    <App />,
 document.getElementById('root')
 );
