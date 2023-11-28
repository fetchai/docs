import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  Grid2,
  CodeHeading,
  Tag,
  ApiIntro,
  Row,
  Col,
  Section,
  Tab,
  DropDownTabs,
} from "components/mdx";

describe("DropDownTabs", () => {
  it("renders tabs with headings", () => {
    const { getByText } = render(
      <DropDownTabs>
        <Tab heading="Tab 1">Tab 1 content</Tab>
        <Tab heading="Tab 2">Tab 2 content</Tab>
      </DropDownTabs>,
    );

    expect(getByText("Tab 1")).toBeInTheDocument();
    expect(getByText("Tab 2")).toBeInTheDocument();
  });

  it("displays the content of the selected tab", () => {
    const { getByText, queryByText, getByRole } = render(
      <DropDownTabs>
        <Tab heading="Tab 1">Tab 1 content</Tab>
        <Tab heading="Tab 2">Tab 2 content</Tab>
      </DropDownTabs>,
    );
    expect(getByText("Tab 1 content")).toBeInTheDocument();
    expect(queryByText("Tab 2 content")).toBeNull();
    fireEvent.change(getByRole("combobox"), { target: { value: "1" } });
    expect(queryByText("Tab 1 content")).toBeNull();
    expect(getByText("Tab 2 content")).toBeInTheDocument();
  });

  // it('calls handleTabChange when the tab is changed', () => {
  //     const handleTabChange = jest.fn();

  //     const { getByDisplayValue } = render(
  //         <DropDownTabs>
  //             <Tab heading="Tab 1">Tab 1 content</Tab>
  //             <Tab heading="Tab 2">Tab 2 content</Tab>
  //         </DropDownTabs>
  //     );
  //     fireEvent.change(getByDisplayValue('0'), { target: { value: '1' } });
  //     expect(handleTabChange).toHaveBeenCalledTimes(1);
  // });
});

describe("Row component", () => {
  it("renders children inside a div with specified styles", () => {
    const { getByText } = render(
      <Row>
        <span>Test Content</span>
      </Row>,
    );
    const rowElement = getByText("Test Content");
    expect(rowElement).toBeInTheDocument();
    expect(rowElement.parentElement).toHaveClass("nx-pt-4");
    expect(rowElement.parentElement).toHaveClass("nx-gap-8");
    expect(rowElement.parentElement).toHaveClass("nx-flex-mdx");
  });
});

describe("Col component", () => {
  it("renders children inside a div with specified styles", () => {
    const { getByText } = render(
      <Col>
        <span>Test Content</span>
      </Col>,
    );

    const colElement = getByText("Test Content");
    expect(colElement).toBeInTheDocument();
    expect(colElement.parentElement).toHaveClass("nx-w-1/2-mdx");
    expect(colElement.parentElement).toHaveClass("nx-w-full-mdx");
  });
});

describe("Section component", () => {
  it("renders children inside a div with specified styles", () => {
    const { getByText } = render(
      <Section>
        <span>Test Content</span>
      </Section>,
    );

    const sectionElement = getByText("Test Content");
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement.parentElement).toHaveClass("nx-my-32");
  });
});

describe("ApiIntro component", () => {
  it("renders children inside a div with specified styles", () => {
    const { getByText } = render(
      <ApiIntro>
        <span>Test Content</span>
      </ApiIntro>,
    );
    const introElement = getByText("Test Content");
    expect(introElement).toBeInTheDocument();
    expect(introElement.parentElement).toHaveClass("nx-pb-4");
    expect(introElement.parentElement).toHaveClass("nx-pr-4");
  });
});

describe("Tag component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<CodeHeading>Test Children</CodeHeading>);
    expect(getByText("Test Children")).toBeInTheDocument();
  });
  it("renders children inside a div with specified styles", () => {
    const { getByText } = render(
      <Tag>
        <span>Test Content</span>
      </Tag>,
    );
    const tagElement = getByText("Test Content");
    expect(tagElement).toBeInTheDocument();
    expect(tagElement.parentElement).toHaveClass("nx-bg-green-100");
    expect(tagElement.parentElement).toHaveClass("nx-border");
  });
});

describe("CodeHeading Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<CodeHeading>Test Children</CodeHeading>);
    expect(getByText("Test Children")).toBeInTheDocument();
  });
  it("applies the correct CSS class", () => {
    const { container } = render(<CodeHeading>Test Children</CodeHeading>);
    const codeHeadingDiv = container.querySelector(".nx-flex.nx-gap-2");
    expect(codeHeadingDiv).toBeInTheDocument();
  });
});

describe("Grid2 component", () => {
  test("Grid2 renders children and applies grid classes", () => {
    const childText = "Test Child";
    const { getByText, container } = render(
      <Grid2>
        <div>{childText}</div>
      </Grid2>,
    );
    const gridContainer = container.firstChild;
    const childElement = getByText(childText);
    expect(gridContainer).toHaveClass(
      "nx-grid",
      "nx-grid-cols-1",
      "nx-pt-4",
      "sm:nx-grid-cols-1",
      "md:nx-grid-cols-2",
      "lg:nx-grid-cols-2",
      "nx-gap-4",
    );
    expect(childElement).toBeInTheDocument();
  });
});
