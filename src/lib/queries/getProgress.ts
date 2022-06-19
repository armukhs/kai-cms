import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

const TYPE = 'komunikasi';

export default async function getProgress(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  // if (opt === undefined || opt == '') {
  //   return res.status(400).json({ message: 'ID not defined' });
  // }
  if (typeof opt != 'string' || opt == '') {
    return res.status(400).json({ message: 'ID not defined' });
  }

  try {
    const id = opt as string;
    const [rencana, progress] = await prisma.$transaction([
      // prisma.rencana.findUnique({
      //   where: { id: id },
      // }),
      prisma.$queryRaw`SELECT "Rencana".*, "managerId", "staffId", "mentorId"
      FROM "Rencana" LEFT JOIN "Project" ON "Rencana"."projectId"="Project"."id"
      WHERE "Rencana"."id"=${id} LIMIT 1;
      `,

      prisma.progress.findMany({
        where: {
          rencanaId: id,
        },
      }),
    ]);
    console.log('RENCANA', rencana);

    if (rencana.length == 0) return res.status(400).json({ message: 'ID not defined' });

    return res.json({ rencana: rencana[0], progress });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
