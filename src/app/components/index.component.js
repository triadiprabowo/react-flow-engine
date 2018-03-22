// import core modules
import React from 'react';
import { connect } from 'react-redux';

// @connect((store) => {
// 	return {
// 		character: store['CharacterReducer'],
// 		movies: store['MovieReducer'],
// 		hometown: store['HometownReducer']
// 	}
// })
export default class IndexComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		
	}

	render() {
		return (
			<h1>Hello World</h1>
		);
	}
}