import { shallow, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

// import component
import IndexComponent from '../src/app/components/index.component';

describe('IndexComponent', () => {
	let component, store;

	beforeEach(() => {
		component = shallow(<IndexComponent />);
	});

	it('shows text of "Hello World"', () => {
		expect(component.find('h1').text()).toEqual('Hello World');
	});
});