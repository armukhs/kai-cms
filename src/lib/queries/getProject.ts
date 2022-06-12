import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getProject(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.opt || '';
  console.log(id);

  try {
    const project = await prisma.project.findUnique({
      where: { id: id as string },
      include: {
        Manager: { select: { nama: true } },
        Mentor: { select: { nama: true } },
        Unit: { select: { nama: true, kode: true } },
        // Komentar: {
        //   where: { type: 'project' },
        //   include: {
        //     User: {
        //       select: { nipp: true, nama: true },
        //     },
        //   },
        // },
      },
    });

    if (!project) return res.status(404).json({ message: 'Not Found' });

    return res.json(project);
  } catch (error) {
    return res.status(500).json(error);
  }
}
