import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';

export default async function saveProgress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { rencanaId, type, progress } = req.body;
    console.log(rencanaId, type, progress);

    const array: string[] = [];
    const lines = progress.split('\n');
    lines.forEach((line: string) => {
      if (line.length > 0) array.push(line);
    });
    const input = array.join('<br/><br/>');
    console.log(input);

    const rs = await prisma.progress.create({
      data: {
        id: cuid.slug(),
        rencanaId: rencanaId,
        type: type,
        progress: input,
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
