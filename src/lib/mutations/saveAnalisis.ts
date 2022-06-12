import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveAnalisis(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, data } = req.body;
    const rs = await prisma.kesiapan.update({
      where: { projectId: projectId },
      data: data,
    });

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
