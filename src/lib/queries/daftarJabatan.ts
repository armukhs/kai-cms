import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function daftarJabatan(req: NextApiRequest, res: NextApiResponse) {
  // const rs = await prisma.jabatan.findMany({
  //   select: {
  //     id: true,
  //     unitId: true,
  //     kode: true,
  //     nama: true,
  //   },
  // });
  // return res.json(rs);
  try {
    const rs = await prisma.jabatan.findMany({
      select: {
        id: true,
        unitId: true,
        kode: true,
        nama: true,
      },
    });

    const jabatans: any[] = [];
    rs.forEach((item) => {
      jabatans.push({
        ...item,
        value: item.id,
        label: `${item.kode} - ${item.nama}`,
      });
    });

    return res.json(jabatans);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
