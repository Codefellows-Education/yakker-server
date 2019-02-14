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

    let formData = 'words';
    let submit = component.find("input");
    submit.simulate("submit");

    setTimeout(() => {
      expect(component.find("li").exists()).toBeTruthy();

      let nameButton = component.find("input");
      nameButton.simulate("submit");

      expect(component.find(".keys").exists()).toBeTruthy();
    }, 1000);

  });

  it("renders troll to the page", () => {
    let component = mount(
      <Troll />
    );

    expect(component.find("form").exists()).toBeTruthy();
    expect(component.find("h2").exists()).toBeTruthy();
  });

});

