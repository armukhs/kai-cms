import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

const TYPE = 'proses';

// load ALL perubahan of type proses of a project
export async function getPerubahan(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  if (opt === undefined || opt == '') {
    return res.status(400).json({ message: 'Id not defined' });
  }

  const start = Date.now();

  try {
    const id = opt as string;
    const rs = await prisma.perubahan.findMany({
      where: { projectId: id },
      select: {
        UnitPerubahan: {
          select: {
            type: true,
            unitId: true,
          },
        },
      },
    });

    const allUIDs: string[] = [];
    const prosesUIDs: string[] = [];
    const teknologiUIDs: string[] = [];
    const strukturUIDs: string[] = [];
    const peranUIDs: string[] = [];
    const budayaUIDs: string[] = [];
    const kompetensiUIDs: string[] = [];
    const lainnyaUIDs: string[] = [];

    rs.forEach((item) => {
      item.UnitPerubahan.forEach((ub) => {
        allUIDs.push(ub.unitId);

        switch (ub.type) {
          case 'proses':
            prosesUIDs.push(ub.unitId);
            break;
          case 'teknologi':
            teknologiUIDs.push(ub.unitId);
          case 'struktur':
            strukturUIDs.push(ub.unitId);
            break;
          case 'peran':
            peranUIDs.push(ub.unitId);
            break;
          case 'budaya':
            budayaUIDs.push(ub.unitId);
            break;
          case 'kompetensi':
            kompetensiUIDs.push(ub.unitId);
            break;
          case 'lainnya':
            lainnyaUIDs.push(ub.unitId);
            break;
          default:
            break;
        }
      });
    });

    const unitIds = [
      prosesUIDs,
      teknologiUIDs,
      strukturUIDs,
      peranUIDs,
      budayaUIDs,
      kompetensiUIDs,
      lainnyaUIDs,
    ];
    // console.log(unitIds);

    const unitTerdampak = await prisma.unit.findMany({
      where: {
        id: {
          in: allUIDs,
        },
      },
    });
    // console.log(unitTerdampak);

    console.log(Date.now() - start);

    if (!rs) return res.status(404).json({ message: 'Not Found' });
    return res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

interface IUnitPerubahan {
  projectId: string;
  type: string;
  id: string;
  parentId: string;
  kode: string;
  level: number;
  nama: string;
}

export default async function getAnalisis(req: NextApiRequest, res: NextApiResponse) {
  const opt = req.query.opt;
  if (opt === undefined || opt == '') {
    return res.status(400).json({ message: 'Id not defined' });
  }

  const start = Date.now();
  try {
    const id = opt as string;
    // Check if project exists
    const project = await prisma.project.findFirst({
      where: { id: id },
      select: { id: true, managerId: true, staffId: true, mentorId: true },
    });

    if (!project) return res.status(404).json({ message: 'Not found' });

    // if Kesiapan not found, create
    // let chkKesiapan = await prisma.kesiapan.findFirst({ where: { projectId: id } });
    // if (!chkKesiapan) {
    //   await prisma.kesiapan.create({ data: { projectId: id } });
    // }

    const kesiapan = await prisma.kesiapan.findUnique({ where: { projectId: id } });

    const rs: IUnitPerubahan[] = await prisma.$queryRaw`SELECT up."projectId", up."type",
    u."id", u."parentId", u."kode", u."level", u."nama"
    from "UnitPerubahan" up left join "Unit" u on up."unitId"=u.id
    where up."projectId"=${id}
    order by type`;

    const levels = [5, 4, 3, 2, 1];

    let topLevel = 0;
    let topLevelCount = 0;
    let topProsesLevel = 0;
    let topTeknologiLevel = 0;
    const unitProsesCount = rs.filter((u) => u.type == 'proses').length;
    const unitReknologiCount = rs.filter((u) => u.type == 'teknologi').length;
    //
    const unitStrukturCount = rs.filter((u) => u.type == 'struktur').length;
    const unitPeranCount = rs.filter((u) => u.type == 'peran').length;
    const unitBudayaCount = rs.filter((u) => u.type == 'budaya').length;
    const unitKompetensiCount = rs.filter((u) => u.type == 'kompetensi').length;
    const unitLainnyaCount = rs.filter((u) => u.type == 'lainnya').length;
    //
    const unitStrukturVal = unitStrukturCount > 0 ? 1 : 0;
    const unitPeranVal = unitPeranCount > 0 ? 1 : 0;
    const unitBudayaVal = unitBudayaCount > 0 ? 1 : 0;
    const unitKompetensiVal = unitKompetensiCount > 0 ? 1 : 0;
    const unitLainnyaVal = unitLainnyaCount > 0 ? 1 : 0;

    rs.forEach((unit) => {
      if (topLevel == 0) {
        topLevel = levels[unit.level];
      } else {
        if (levels[unit.level] > topLevel) {
          topLevel = levels[unit.level];
        }
      }
    });

    rs.forEach((unit) => {
      if (levels[unit.level] == topLevel) topLevelCount++;
    });

    // topProsesLevel
    rs.filter((u) => u.type == 'proses').forEach((unit) => {
      if (topProsesLevel == 0) {
        topProsesLevel = levels[unit.level];
      } else {
        if (levels[unit.level] > topProsesLevel) {
          topProsesLevel = levels[unit.level];
        }
      }
    });

    // topTeknologiLevel
    rs.filter((u) => u.type == 'teknologi').forEach((unit) => {
      if (topTeknologiLevel == 0) {
        topTeknologiLevel = levels[unit.level];
      } else {
        if (levels[unit.level] > topTeknologiLevel) {
          topTeknologiLevel = levels[unit.level];
        }
      }
    });

    console.log(Date.now() - start);

    if (topLevel == 4 && topLevelCount > 1) topLevel = 5;

    return res.json({
      id: project.id,
      managerId: project.managerId,
      staffId: project.staffId,
      mentorId: project.mentorId,
      topLevel,
      topLevelCount,
      topProsesLevel,
      topTeknologiLevel,
      unitProsesCount,
      unitReknologiCount,
      unitStrukturCount,
      unitPeranCount,
      unitBudayaCount,
      unitKompetensiCount,
      unitLainnyaCount,
      unitStrukturVal,
      unitPeranVal,
      unitBudayaVal,
      unitKompetensiVal,
      unitLainnyaVal,
      kesiapan,
      units: rs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
