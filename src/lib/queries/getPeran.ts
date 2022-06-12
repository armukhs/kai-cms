import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

const TYPE = 'peran';

// load ALL perubahan of type proses of a project
export default async function getPeran(req: NextApiRequest, res: NextApiResponse) {
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
          // teknologi: true,
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
    console.log('PROJECT', project);

    if (!project) return res.status(400).json({ message: 'ID not defined' });
    return res.json({ project, perubahan });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
