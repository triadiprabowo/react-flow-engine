import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from "react-redux";
import AppStore from '../src/app/app.store';

// import action
import FlowExecutorAction from '../src/app/actions/flow-executor.action';
import RulesReducer from '../src/app/reducers/rules.reducer';

// import component
import IndexComponent from '../src/app/components/index.component';

describe('IndexComponent', () => {
	let component, store;

	beforeEach(() => {
		component = shallow(<IndexComponent store={AppStore} />);
	});

	it('should initialize app store of RulesReducer', () => {
		expect(component.props().rules.data).toHaveLength(0);
	});

	it('should initialize rules from getRules()', () => {
		component.props().dispatch(FlowExecutorAction.getRules());
		expect(AppStore.getState().RulesReducer.data).toHaveLength(6);
	});

	it('should executed function', () => {
		component.props().dispatch(
			FlowExecutorAction.run(AppStore.getState().RulesReducer.data, {x: 6, y: 8})
		);

		expect(AppStore.getState().RulesReducer.executed).toBe(true);
	});
});