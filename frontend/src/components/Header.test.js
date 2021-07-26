import React from "react";
import { mount, shallow } from "enzyme";
import Header from "./Header";

let renderedComponent;
let mockSetAuth = () => true;

beforeEach(() => {
  renderedComponent = shallow(<Header first="test" />);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("SignUp Component", () => {
  it("should render compoennt", () => {
    expect(renderedComponent).toBeDefined();
  });

  it("Should match snapshot", () => {
    expect(renderedComponent).toMatchSnapshot();
  });
});
