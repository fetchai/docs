import { Input } from "../input";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { RefObject } from "react";

describe("Input Component", () => {
  it("forwards ref to input element", () => {
    const ref = React.createRef() as RefObject<HTMLInputElement>;
    render(<Input ref={ref} />);
    const inputElement = screen.getByRole("input");
    expect(ref.current).toBe(inputElement);
  });
  test("handles input events", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("input");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "test" }),
      }),
    );
  });
});
