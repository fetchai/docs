import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import IndexPage from "components/products";
import { AppRouterContextProviderMock } from "app-router-context-provider-mock";
import synergyIcon from "../src/svgs/synergy.svg";
const mockItems = {
  "AI Engine": [
    {
      title: "Synergy of agent-based services and AI Engine ecosystem",
      description: (
        <>
          Discover how the AI Engine facilitates interactions by discovering
          user preferences, transforming raw data into actionable insights
          through collaboration with agent-based services.
        </>
      ),
      icon: synergyIcon,
      path: "/concepts/ai-engine/the-synergetic-power-of-agent-based-services-in-the-ai-engine-ecosystem",
    },
  ],
};

describe("IndexPage Component", () => {
  test("renders without crashing", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <IndexPage />
      </AppRouterContextProviderMock>,
    );
  });

  test("navigates to the correct path when an item is clicked", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <IndexPage />
      </AppRouterContextProviderMock>,
    );
    const sampleItem = mockItems["AI Engine"][0];
    const itemElement = screen.getByText(sampleItem.title);
    fireEvent.click(itemElement);
    expect(push).toHaveBeenCalledWith(sampleItem.path);
  });

  it("applies hover styles to Item when hovered over", () => {
    const push = jest.fn();
    const { getByText } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <IndexPage />
      </AppRouterContextProviderMock>,
    );
    const sampleItem = mockItems["AI Engine"][0];
    const itemElement = getByText(sampleItem.title);
    fireEvent.mouseOver(itemElement);
    expect(itemElement).toHaveClass("nx-text-purple");
    expect(itemElement).toHaveClass("nx-text-lg");
    expect(itemElement).toHaveClass("nx-font-medium");
    expect(itemElement).toHaveClass("nx-mb-2");
  });
});
