import cuid from 'cuid';
import units from '../../prisma/units.json';
import jabatans from '../../prisma/jabatans.json';
import units2 from '../../prisma/units2.json';

function rebuild1() {
  const array: any[] = [];
  units.forEach((u) => {
    array.push({
      _id: u.id,
      _parentId: u.parentId,
      id: cuid.slug(),
      parentId: u.parentId ? '' : null,
      kode: u.kode,
      level: u.level,
      tipe: u.tipe,
      nama: u.nama,
    });
  });
  return array;
}

function rebuild2() {
  const rs1 = rebuild1();

  const rs2: any[] = [];
  rs1.forEach((u) => {
    let parentId = null;
    if (u._parentId) {
      const unit = rs1.filter((x) => x._id == u._parentId)[0];
      if (unit) parentId = unit.id;
    }
    rs2.push({
      _id: u._id,
      _parentId: u._parentId,
      id: u.id,
      parentId: parentId,
      kode: u.kode,
      level: u.level,
      tipe: u.tipe,
      nama: u.nama,
    });
  });

  return rs2;
}

function rebuild3() {
  const rs: any[] = [];
  jabatans.forEach((jb) => {
    const unit = units2.filter((x) => x._id == jb.unitId)[0];
    rs.push({
      _id: jb.id,
      _unitId: jb.unitId,
      id: cuid.slug(),
      unitId: unit.id,
      kode: jb.kode,
      nama: jb.nama,
    });
  });

  return rs;
}

export default function Seed() {
  // const units = rebuild2();
  // const items = rebuild3();

  return <pre></pre>;
}
