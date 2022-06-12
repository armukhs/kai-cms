import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getKomentar(req: NextApiRequest, res: NextApiResponse) {
  // Expect opt as array [projectId, type]
  const opt = req.query.opt;

  try {
    if (Array.isArray(opt) && opt.length <= 2) {
      const projectId = opt[0];
      const type = opt[1];
      const rs = await prisma.komentar.findMany({
        where: { projectId: projectId, type: type },
        include: {
          User: {
            select: { nipp: true, nama: true },
          },
        },
      });

      return res.json(rs);
    }

    return res.status(400).json({ message: 'ID not defined' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
