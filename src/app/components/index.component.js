// import core modules
import React from 'react';
import { connect } from 'react-redux';

// import containers
import ResultFlow from './result-flow.container';

// import flow executor action
import FlowExecutorAction from '../actions/flow-executor.action';

@connect((store) => {
	return {
		rules: store['RulesReducer']
	}
})
export default class IndexComponent extends React.Component {
	constructor(props) {
		super(props);

		this.renderCard = this.renderCard.bind(this);
	}

	componentWillMount() {
		// get initial rules (un-executed)
		this.props.dispatch(FlowExecutorAction.getRules());
	}

	renderCard() {
		if(this.props.rules.executed) {
						
		}
	}

	render() {
		return (
			<div className="outer">
				<div className="wrapper">
					<div class="container">
						<h1>React.js Flow Engine</h1>
						<button id="flow-executor" className="button" onClick={
							() => this.props.dispatch(FlowExecutorAction.run(this.props.rules.data, {x: 4, y: 4.5}))
						}>Execute Rules!</button>

						<ResultFlow rules={this.props.rules} />
					</div>
				</div>
			</div>
		);
	}
}