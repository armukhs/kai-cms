import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getTopUnits(req: NextApiRequest, res: NextApiResponse) {
  const units = await prisma.unit.findMany({
    where: {
      parentId: null,
    },
  });
  return res.json(units);
}
