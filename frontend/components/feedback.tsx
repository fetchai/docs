import React, { useState, useEffect } from "react";

const FeedbackComponent = ({ pageUrl }: { pageUrl: string }) => {
  const [feedback, setFeedback] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState(""); // State to track feedback type

  const resetState = () => {
    setFeedback("");
    setIsFeedbackSubmitted(false);
    setInputVisible(false);
    setFeedbackType("");
  };

  useEffect(() => {
    // When the component mounts, reset its state
    resetState();
  }, [pageUrl]); // Reset the state whenever the pageUrl changes

  const handleThumbsClick = (type) => {
    // Set the feedback type and open the input box when thumbs up or thumbs down is clicked
    setFeedbackType(type);
    setInputVisible(true);
  };

  const handleFeedbackSubmit = async () => {
    // Now you can associate feedback type, feedback and page
    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbackType, feedback, pageUrl }),
      });

      if (response.ok) {
        setIsFeedbackSubmitted(true);
      } else {
        // Handle error
        console.log("---something went wrong----");
      }
    } catch (error) {
      // Handle errors
      console.log("---oops, something went wrong----", error);
    }
  };

  return (
    <div>
      {isFeedbackSubmitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <>
          <h3 className="nx-text-lg nx-flex nx-justify-center ">
            Was this page helpful?
          </h3>
          <div
            className={`nx-flex nx-items-center nx-space-x-4 nx-mt-4 nx-justify-center`}
          >
            <div
              className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-bg-green nx-cursor-pointer`}
              onClick={() => handleThumbsClick("positive")}
            >
              👍
            </div>
            <div
              className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-bg-red-500 nx-cursor-pointer`}
              onClick={() => handleThumbsClick("negative")}
            >
              👎
            </div>
          </div>
          {isInputVisible && (
            <div className="nx-mt-4 nx-flex nx-flex-col nx-justify-center">
              <textarea
                className="nx-rounded-lg nx-border nx-border-gray-300 nx-bg-gray-100 nx-p-4 nx-shadow-inner"
                placeholder="Enter your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button
                className="nx-mt-4 nx-bg-purple nx-hover:nx-bg-purple-600 nx-text-white nx-font-bold nx-py-2 nx-px-4 nx-rounded-xxl"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackComponent;
