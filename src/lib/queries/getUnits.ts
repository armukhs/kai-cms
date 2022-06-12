import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getUnits(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  if (opt === undefined || opt == '') {
    const units = await prisma.unit.findMany({});
    return res.json(units);
  }

  const filter = Array.isArray(opt) ? opt[0].toUpperCase() : opt.toUpperCase();
  const units = await prisma.unit.findMany({
    where: {
      kode: { startsWith: filter },
    },
  });
  return res.json(units);
}
