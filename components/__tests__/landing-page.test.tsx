import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyApp from "components/landing-page";
import { AppRouterContextProviderMock } from "app-router-context-provider-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
describe("Landing page", () => {
  test("renders LandingPage component", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MyApp />
      </AppRouterContextProviderMock>,
    );
  });

  test("clicking on a guide navigates to the correct path", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MyApp />
      </AppRouterContextProviderMock>,
    );

    const guideElements = screen.getAllByTestId("guide-box");

    fireEvent.click(guideElements[0]);
    expect(push).toHaveBeenCalledWith("/guides/agents/installing-uagent");
  });

  test("hovering over a guide changes its style", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MyApp />
      </AppRouterContextProviderMock>,
    );
    const guideElements = screen.getAllByTestId("guide-box");
    fireEvent.mouseOver(guideElements[0]);
    expect(guideElements[0]).toHaveClass("hoverGuideBox");
  });

  test("leaving a guide reverts its style back", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <MyApp />
      </AppRouterContextProviderMock>,
    );
    const guideElements = screen.getAllByTestId("guide-box");
    fireEvent.mouseOver(guideElements[0]);
    fireEvent.mouseLeave(guideElements[0]);
    expect(guideElements[0]).toHaveClass("guideBox");
  });
});
