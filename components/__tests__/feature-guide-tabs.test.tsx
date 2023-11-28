import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureGuideTabs } from "components/feature-guide-tabs";
import React from "react";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("feature-guide-tabs components", () => {
  test("renders component correctly", () => {
    render(<FeatureGuideTabs />);
    expect(screen.getByText("AI Agents")).toBeInTheDocument();
  });
  test("handles tab selection on desktop", () => {
    render(<FeatureGuideTabs />);
    fireEvent.click(screen.getByText("Agentverse"));
    expect(screen.getByText("Creating a hosted agent 🤖")).toBeInTheDocument();
  });
  test("handles tab selection on mobile", () => {
    global.innerWidth = 600;
    render(<FeatureGuideTabs />);
    const selectElement = screen.getByRole("combobox");
    userEvent.selectOptions(selectElement, ["1"]);
    expect(
      screen.getByText("Creating your first agent 🤖🧑‍💻"),
    ).toBeInTheDocument();
    global.innerWidth = 1024;
  });
  test("handles hover condition", () => {
    render(<FeatureGuideTabs />);
    fireEvent.mouseOver(
      screen.getByTestId("guideBox-Installing the uAgents Framework 🛠️📲"),
    );
    expect(
      screen.getByTestId("guideBox-Installing the uAgents Framework 🛠️📲"),
    ).toHaveClass("hoverGuideBox");
  });

  test("handles  hover leave condition", () => {
    render(<FeatureGuideTabs />);
    fireEvent.mouseOver(
      screen.getByTestId("guideBox-Installing the uAgents Framework 🛠️📲"),
    );
    fireEvent.mouseLeave(
      screen.getByTestId("guideBox-Installing the uAgents Framework 🛠️📲"),
    );
    expect(
      screen.getByTestId("guideBox-Installing the uAgents Framework 🛠️📲"),
    ).toHaveClass("guideBox");
  });
});
