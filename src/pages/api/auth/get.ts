import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'lib/session';
import { AUTH_QUERIES } from 'lib/queries';

export async function apiGet(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    return res.status(401).json({ message: 'Forbidden' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let sub = req.query.sub;
  if (sub === undefined) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (Array.isArray(sub)) sub = sub[0];

  // @ts-ignore
  if (AUTH_QUERIES[sub] === undefined) {
    return res.status(500).json({ message: 'Sorry, this error comes from us.' });
  }
  console.log('sub', sub);

  // @ts-ignore
  const handler = AUTH_QUERIES[sub];
  return handler(req, res);
}

export default withIronSessionApiRoute(apiGet, sessionOptions);
