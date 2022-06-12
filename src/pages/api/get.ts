import { NextApiRequest, NextApiResponse } from 'next';
import { QUERIES } from 'lib/queries';

export default async function apiGet(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let sub = req.query.sub;
  if (sub === undefined) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (Array.isArray(sub)) sub = sub[0];

  // @ts-ignore
  if (QUERIES[sub] === undefined) {
    return res.status(500).json({ message: 'Sorry, this error comes from us.' });
  }
  console.log('sub', sub);

  // @ts-ignore
  const handler = QUERIES[sub];
  return handler(req, res);
}
