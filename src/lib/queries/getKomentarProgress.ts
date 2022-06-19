import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getKomentarProgress(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;

  try {
    const rencanaId = Array.isArray(opt) ? opt[0] : opt;
    const rs = await prisma.komentarProgress.findMany({
      where: { rencanaId: rencanaId },
      include: {
        User: {
          select: { nipp: true, nama: true },
        },
      },
    });

    return res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
