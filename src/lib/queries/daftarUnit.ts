import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function daftarUnit(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rs = await prisma.unit.findMany({
      select: {
        id: true,
        parentId: true,
        kode: true,
        nama: true,
      },
    });

    const units: any[] = [];
    rs.forEach((item) => {
      units.push({
        ...item,
        value: item.id,
        label: `${item.kode} - ${item.nama}`,
      });
    });

    const parents = rs.filter((unit) => unit.parentId == null);
    return res.json({ units, parents });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
