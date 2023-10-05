// pages/api/feedback.ts
import { NextApiRequest, NextApiResponse } from 'next';
// import { pool } from '../../path-to-your-db-connection'; // Import your PostgreSQL database connection

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { feedbackType, feedback, pageUrl } = req.body;

      // Insert feedback data into PostgreSQL
    //   const result = await pool.query(
    //     'INSERT INTO feedback (feedback_type, message, page_url, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
    //     [feedbackType, feedback, pageUrl, userId]
    //   );

    //   const insertedFeedbackId = result.rows[0].id;

      console.log('------feedback-----', feedback)
      console.log('------feedbackType-----', feedbackType)
      console.log('------pageUrl-----', pageUrl)
      
      res.status(201).json({ message: 'Feedback submitted successfully', feedbackType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
