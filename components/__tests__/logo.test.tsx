import { render } from "@testing-library/react";
import Logo from "components/logo";
import React from "react";

describe("Logo component", () => {
  it("renders without crashing", () => {
    render(<Logo />);
  });

  it("renders the image with the correct alt text", () => {
    const { getByAltText } = render(<Logo />);
    const image = getByAltText("Logo");
    expect(image).toBeInTheDocument();
  });

  it("renders the image with the correct className", () => {
    const { container } = render(<Logo />);
    const image = container.querySelector(".docsLogo");
    expect(image).toBeInTheDocument();
  });
});
