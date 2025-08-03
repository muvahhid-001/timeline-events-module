import React from "react";
import { render } from "@testing-library/react";
import { FallbackCircle } from "../../FallbackCircle";

describe("FallbackCircle", () => {
  it("рендерится с нужными классами", () => {
    const { container } = render(<FallbackCircle />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("fallbackCircleWrapper");

    const innerDiv = wrapper.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass("fallbackCircle");
  });
});
