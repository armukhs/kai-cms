import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function adminProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [projects, users] = await prisma.$transaction([
      prisma.project.findMany({
        select: {
          id: true,
          managerId: true,
          mentorId: true,
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
      }),

      // Mentors only
      prisma.user.findMany({
        // where: { unitId: { not: null } },
        where: {
          roles: { contains: 'mentor' },
        },
      }),
    ]);

    const mentors: any[] = [];
    users.forEach((user) => {
      mentors.push({ value: user.id, label: user.nama });
    });

    return res.json({ projects, mentors });
  } catch (error) {
    return res.status(500).json(error);
  }
}
