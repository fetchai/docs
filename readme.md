### To post feedback:  

````cython
curl -X POST -H "Content-Type: application/json" -d '{
  "feedbackType": "YourFeedbackType",
  "description": "YourFeedbackDescription",
  "pageUrl": "YourPageURL"
}' http://localhost:8000/api/feedback
````