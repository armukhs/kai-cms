import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

const TYPE = 'sponsorship';

export default async function getSponsorship(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  console.log('OPT', opt);

  if (opt === undefined || opt == '') {
    return res.status(400).json({ message: 'ID not defined' });
  }

  try {
    const projectId = opt as string;
    const [project, rencana] = await prisma.$transaction([
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

      prisma.rencana.findMany({
        where: {
          projectId: projectId,
          type: TYPE,
        },
        include: {
          PIC: true,
          UnitRencana: true,
          _count: {
            select: { Progress: true },
          },
        },
        orderBy: { created: 'asc' },
      }),
    ]);
    console.log('PROJECT', project);

    if (!project) return res.status(400).json({ message: 'Not Found' });
    return res.json({ project, rencana });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
