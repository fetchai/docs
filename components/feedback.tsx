import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

const isMaliciousString = (text) => {
  // Define a regular expression to match potentially harmful characters
  const harmfulCharsPattern = /["';\\]/;

  // Check if the input text contains any harmful characters
  return harmfulCharsPattern.test(text);
};

const FeedbackComponent = ({ pageUrl }: { pageUrl: string }) => {
  const [feedback, setFeedback] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState(""); // State to track feedback type
  const [maliciousStringDetected, setMaliciousStringDetected] = useState(false); // State to track malicious string detection

  const resetState = () => {
    setFeedback("");
    setIsFeedbackSubmitted(false);
    setInputVisible(false);
    setFeedbackType("");
    setMaliciousStringDetected(false);
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

  const handleTextareaBlur = () => {
    if (isMaliciousString(feedback)) {
      // Display an error message and mark the string as malicious
      setMaliciousStringDetected(true);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (isMaliciousString(feedback)) {
      // Display an error message and do not make the API call
      setMaliciousStringDetected(true);
      return;
    }

    // Make the API call only if no malicious string is detected
    try {
      const response = await fetch("/docs/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback_type: feedbackType,
          description: feedback,
          page_url: `/docs${pageUrl}`,
        }),
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
    <div className="nx-w-full">
      {isFeedbackSubmitted ? (
        <p className="nx-flex nx-justify-center">
          Thank you for your feedback!
        </p>
      ) : (
        <>
          <h3 className="nx-text-lg md:nx-mt-0 nx-mt-3 nx-flex nx-justify-center ">
            Was this page helpful?
          </h3>
          <div
            className={`nx-flex nx-items-center nx-space-x-4 nx-mt-4 nx-justify-center`}
          >
            {feedbackType === "positive" ? (
              <div
                className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-border nx-bg-green`}
              >
                <FaThumbsUp className="nx-text-white" />
              </div>
            ) : (
              <div
                className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-border nx-border-green nx-cursor-pointer`}
                onClick={() => handleThumbsClick("positive")}
              >
                <FaRegThumbsUp />
              </div>
            )}
            {feedbackType === "negative" ? (
              <div
                className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-border nx-bg-red`}
              >
                <FaThumbsDown className="nx-text-white" />
              </div>
            ) : (
              <div
                className={`nx-w-12 nx-h-12 nx-flex nx-items-center nx-justify-center nx-rounded-full nx-border nx-border-red nx-cursor-pointer`}
                onClick={() => handleThumbsClick("negative")}
              >
                <FaRegThumbsDown />
              </div>
            )}
          </div>
          {isInputVisible && (
            <div className="nx-mt-4 nx-flex nx-flex-col nx-w-full">
              <textarea
                className={`nx-rounded-lg nx-border nx-border-gray-300 nx-bg-gray-100 nx-p-4 nx-shadow-inner nx-max-w-532px nx-w-full nx-mx-auto nx-min-h-132px ${
                  maliciousStringDetected ? "nx-border-red" : ""
                }`}
                placeholder="Enter your feedback..."
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setMaliciousStringDetected(false); // Clear the malicious string detection status when the text changes
                }}
                onBlur={handleTextareaBlur}
              />
              {maliciousStringDetected && (
                <p className="nx-text-red-500 nx-text-sm nx-mx-auto">
                  Malicious string detected in the feedback.
                </p>
              )}
              <button
                className={`nx-mt-4 nx-bg-submit-feedback nx-text-white nx-font-bold nx-py-2 nx-px-4 nx-rounded-xxl nx-max-w-180px nx-mx-auto nx-w-full ${
                  maliciousStringDetected ? "nx-bg-gray-400" : ""
                }`}
                onClick={handleFeedbackSubmit}
                disabled={maliciousStringDetected}
              >
                Submit Feedback
              </button>
            </div>
          )}
          <h3 className="md:nx-text-base nx-text-sm nx-flex nx-justify-center nx-mt-3">
            You can also leave detailed feedback
            <Link
              className="nx-text-primary-600 nx-ml-1 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
              target="_blank"
              href={`https://github.com/fetchai/docs/issues/new?title=Issue: <Issue Related to ${pageUrl}>`}
            >
              on Github
            </Link>
          </h3>
        </>
      )}
    </div>
  );
};

export default FeedbackComponent;
