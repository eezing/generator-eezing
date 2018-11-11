import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import HelloWorld from '../HelloWorld.js';

describe('With Enzyme', () => {
  it('HelloWorld shows "hello world!"', () => {
    const result = shallow(<HelloWorld />);
    expect(result.find('h1').text()).toEqual('hello world!');
  });
});

describe('With Snapshot Testing', () => {
  it('HelloWorld shows "hello world!"', () => {
    const component = renderer.create(<HelloWorld />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
