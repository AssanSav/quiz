import React from "react";

import chai, { expect }from "chai";
import Enzyme, { shallow } from "enzyme";
import QuizTest from "../components/QuizTest";

import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("<QuizCardClassComponent />", () => {
  it("should have the correct answer when clicked", () => {
    const wrapper = shallow(<QuizTest />);
    wrapper.find(".correct").simulate("click");
    expect(wrapper.state().correctAnswer).to.equal("<img src='cat.jpg' />");
  });

  it("should have an incorrect answer when clicked", () => {
    const wrapper = shallow(<QuizTest />);
    wrapper.find(".incorrect").simulate("click");
    expect(wrapper.state().incorrectAnswer).to.equal("<img>cat.jpg</img>");
  });
});
