import React from 'react';
import Square from './Square';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
    shallow(
        <Square />
    );
});

it('renders the correct letter', () => {
    const wrapper = shallow(
        <Square letter="X" />
    );
    
    expect(wrapper.text()).toEqual('X');
});