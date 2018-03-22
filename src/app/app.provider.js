// react router
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";

// import store
import AppStore from './app.store';

// import components
import IndexComponent from './components/index.component';

export default class AppProvider extends React.Component {
	render() {
		return (
			<Provider store={AppStore}>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={IndexComponent} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}