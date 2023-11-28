import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { Collapse } from "../collapse";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("Collapse Component", () => {
  it("height 0 when collapse is not open", async () => {
    const { getByTestId, getByText } = render(
      <Collapse isOpen={false}>Test Content</Collapse>,
    );
    const containerElement = getByTestId("collapse-container");
    fireEvent.click(getByText("Test Content"));
    await waitFor(() => {
      expect(containerElement).toHaveStyle("height: 0px");
    });
  });

  it("check that collapse compoent is open", async () => {
    const { getByTestId, getByText } = render(
      <Collapse isOpen={false}>Test Content</Collapse>,
    );
    const innerElement = getByTestId("collapse-inner");
    fireEvent.click(getByText("Test Content"));
    await waitFor(() => {
      expect(innerElement).toHaveClass("nx-opacity-0");
    });
  });

  it("applies animation styles when horizontal changes", async () => {
    const { container, rerender } = render(
      <Collapse isOpen={false} horizontal={false}>
        Test Element
      </Collapse>,
    );
    act(() => {
      rerender(
        <Collapse isOpen={false} horizontal={true}>
          {" "}
          Test Element
        </Collapse>,
      );
    });
    await act(async () => {
      jest.runAllTimers();
      expect(container.firstChild).toHaveStyle("width: 0px");
    });
  });

  it("clears animation timeout on component unmount", () => {
    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
    const { unmount } = render(
      <Collapse isOpen={false} horizontal={false}>
        Test Element
      </Collapse>,
    );
    act(() => {
      unmount();
    });
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    clearTimeoutSpy.mockRestore();
  });
});
