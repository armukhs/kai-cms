import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

const TYPE = 'proses';

export default async function getProses(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  if (opt === undefined || opt == '') {
    return res.status(400).json({ message: 'ID not defined' });
  }

  try {
    const projectId = opt as string;
    const [project, perubahan] = await prisma.$transaction([
      prisma.project.findUnique({
        where: { id: projectId },
        select: {
          id: true,
          judul: true,
          managerId: true,
          staffId: true,
          mentorId: true,
          tglKonfirmasi: true,
        },
      }),

      prisma.perubahan.findMany({
        where: {
          projectId: projectId,
          type: TYPE,
        },
        include: { PIC: true, UnitPerubahan: true },
        orderBy: { created: 'asc' },
      }),
    ]);

    if (!project) return res.status(400).json({ message: 'ID not defined' });
    return res.json({ project, perubahan });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
