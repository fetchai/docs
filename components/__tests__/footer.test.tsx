// Footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "components/footer";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("footer1235123");
    expect(footerElement).toBeInTheDocument();
  });
});
