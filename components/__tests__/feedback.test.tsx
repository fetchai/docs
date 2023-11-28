import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FeedbackComponent from "components/feedback";

const originalConsoleError = console.log;

beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleError;
});

describe("FeedbackComponent", () => {
  test("resets state when pageUrl changes", () => {
    const { rerender } = render(
      <FeedbackComponent pageUrl="/guides/agents/installing-uagent" />,
    );
    fireEvent.click(screen.getByTestId("thumbs-up"));
    expect(screen.getByTestId("feedback-textarea")).toBeInTheDocument();
    rerender(<FeedbackComponent pageUrl="/guides/agents/interval-task" />);
    expect(screen.queryByTestId("feedback-textarea")).not.toBeInTheDocument();
  });

  test("handles thumbs down click", () => {
    render(<FeedbackComponent pageUrl="/guides/agents/installing-uagent" />);
    fireEvent.click(screen.getByTestId("thumbs-down"));

    expect(screen.getByTestId("feedback-textarea")).toBeInTheDocument();
    expect(screen.getByTestId("submit-feedback")).toBeInTheDocument();
  });

  test("submits feedback successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    render(<FeedbackComponent pageUrl="/guides/agents/installing-uagent" />);
    fireEvent.click(screen.getByTestId("thumbs-up"));
    fireEvent.change(screen.getByTestId("feedback-textarea"), {
      target: { value: "Great job!" },
    });
    fireEvent.click(screen.getByTestId("submit-feedback"));

    await waitFor(() => {
      expect(
        screen.getByText("Thank you for your feedback!"),
      ).toBeInTheDocument();
    });
  });

  test("handles feedback submission error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Mocked fetch error"));
    render(<FeedbackComponent pageUrl="/guides/agents/installing-uagent" />);
    fireEvent.click(screen.getByTestId("thumbs-up"));
    fireEvent.change(screen.getByTestId("feedback-textarea"), {
      target: { value: "Great job!" },
    });
    fireEvent.click(screen.getByTestId("submit-feedback"));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        "---oops, something went wrong----",
        expect.any(Error),
      );
    });
  });
});
