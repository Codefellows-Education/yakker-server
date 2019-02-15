import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Troll from '../troll';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('socket.io app', () => {
  it ('updates the words state when things are typed into the form', () => {
    let component = mount(
      <Troll />
    );

    let input = component.find("input");
    let newForm = component.find("form");
    input.simulate("change",  {target: {value: 'words'}});
    newForm.simulate("submit");
    
    let currentState = component.state();
    // console.log('currentState', currentState);
    
    //expect(component.find("li").exists()).toBeTruthy();
    expect(currentState.typedInput).toEqual('words');

  });

  it("renders troll to the page", () => {
    let component = mount(
      <Troll />
    );

    expect(component.find("form").exists()).toBeTruthy();
    expect(component.find("h2").exists()).toBeTruthy();
  });


});

