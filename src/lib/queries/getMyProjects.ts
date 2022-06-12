import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getMyProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = req.session.user;
    const projects = await prisma.project.findMany({
      // where: {
      //   OR: [{ managerId: user?.id }, { mentorId: user?.id }],
      // },
      select: {
        id: true,
        managerId: true,
        mentorId: true,
        staffId: true,
        judul: true,
        Unit: { select: { id: true, kode: true, nama: true } },
        Manager: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
        Mentor: {
          select: { id: true, nama: true, Jabatan: { select: { kode: true, nama: true } } },
        },
      },
      orderBy: { created: 'asc' },
      // include: {
      //   Unit: { select: { id: true, kode: true, nama: true } },
      // },
    });

    return res.json(projects);
  } catch (error) {
    return res.status(500).json(error);
  }
}
