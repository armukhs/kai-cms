import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';

export default async function savePerubahan(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, picId, projectId, type, kondisi, perubahan, unitTerdampak } = req.body;

    const daftarUnit: any[] = [];
    unitTerdampak.forEach((unitId: string) => {
      daftarUnit.push({
        type: type,
        unitId: unitId,
        projectId: projectId,
      });
    });

    if (!id || id == '') {
      // NEW
      const rs = await prisma.perubahan.create({
        data: {
          id: cuid.slug(),
          projectId: projectId,
          picId: picId ? picId : null,
          type: type,
          kondisi: kondisi,
          perubahan: perubahan ? perubahan : null,
          UnitPerubahan: {
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
      await prisma.unitPerubahan.deleteMany({
        where: { perubahanId: id },
      });

      const rs = await prisma.perubahan.update({
        where: { id: id },
        data: {
          picId: picId ? picId : null,
          kondisi: kondisi,
          perubahan: perubahan ? perubahan : null,
          UnitPerubahan: {
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
