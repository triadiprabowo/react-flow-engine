import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppProvider from './app/app.provider';

const app = document.getElementById('app-root');

ReactDOM.render(React.createElement(AppProvider), app);