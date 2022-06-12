import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function getOrganization(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rs1, rs2] = await prisma.$transaction([
      prisma.unit.findMany({
        select: {
          id: true,
          parentId: true,
          kode: true,
          level: true,
          nama: true,
        },
      }),
      prisma.jabatan.findMany({
        select: {
          id: true,
          unitId: true,
          kode: true,
          nama: true,
        },
      }),
    ]);
    // const rs = await prisma.unit.findMany({
    //   select: {
    //     id: true,
    //     parentId: true,
    //     kode: true,
    //     nama: true,
    //   },
    // });

    const units: any[] = [];
    rs1.forEach((item) => {
      units.push({
        ...item,
        value: item.id,
        label: `${item.kode} - ${item.nama}`,
      });
    });

    const parents = rs1.filter((unit) => unit.parentId == null);

    const jabatans: any[] = [];
    rs2.forEach((item) => {
      jabatans.push({
        ...item,
        value: item.id,
        label: `${item.kode} - ${item.nama}`,
      });
    });

    return res.json({ units, parents, jabatans });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
