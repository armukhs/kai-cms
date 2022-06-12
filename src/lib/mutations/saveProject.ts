import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, unitId, managerId, judul, deskripsi, tujuan, target, tglMulai, tglSelesai } =
      req.body;
    const rs = await prisma.project.update({
      where: { id: id },
      data: {
        judul: judul,
        deskripsi: deskripsi,
        tujuan: tujuan,
        target: target,
        tglMulai: tglMulai || null,
        tglSelesai: tglSelesai || null,
      },
    });

    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
