import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';
// id: '',
//       picId: '',
//       projectId: '',
//       type: '',
//       rencana: '',
//       audien: '',
//       waktu: '',
//       tempat: '',
//       tolokUkur: '',
//       monitoring: '',

export default async function saveRencana(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      id,
      picId,
      projectId,
      type,
      rencana,
      audien,
      waktu,
      tempat,
      tolokUkur,
      monitoring,
      unitTerdampak,
    } = req.body;

    const daftarUnit: any[] = [];
    unitTerdampak.forEach((unitId: string) => {
      daftarUnit.push({
        unitId: unitId,
      });
    });

    if (!id || id == '') {
      // NEW
      const rs = await prisma.rencana.create({
        data: {
          id: cuid.slug(),
          projectId: projectId,
          picId: picId ? picId : null,
          type: type,
          rencana: rencana,
          audien: audien,
          waktu: waktu,
          tempat: tempat,
          tolokUkur: tolokUkur,
          monitoring: monitoring,
          UnitRencana: {
            createMany: {
              data: daftarUnit,
            },
          },
        },
      });
      console.log(rs);

      res.json(rs);
    } else {
      // UPDATE

      // Delete unit terdampak
      await prisma.unitRencana.deleteMany({
        where: { rencanaId: id },
      });

      const rs = await prisma.rencana.update({
        where: { id: id },
        data: {
          picId: picId ? picId : null,
          rencana: rencana,
          audien: audien,
          waktu: waktu,
          tempat: tempat,
          tolokUkur: tolokUkur,
          monitoring: monitoring,
          UnitRencana: {
            createMany: {
              data: daftarUnit,
            },
          },
        },
      });

      res.json(rs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
