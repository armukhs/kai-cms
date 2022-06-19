import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';

export default async function saveKomentarProgress(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, rencanaId, value } = req.body;
    console.log(userId, rencanaId);

    const array: string[] = [];
    const lines = value.split('\n');
    lines.forEach((line: string) => {
      if (line.length > 0) array.push(line);
    });
    const input = array.join('<br/><br/>');
    console.log(input);

    const rs = await prisma.komentarProgress.create({
      data: {
        id: cuid.slug(),
        type: '',
        userId: userId,
        rencanaId: rencanaId,
        value: input,
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
