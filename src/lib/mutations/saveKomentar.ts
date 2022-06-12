import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import cuid from 'cuid';

export default async function saveKomentar(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, projectId, type, value } = req.body;
    console.log(userId, projectId, type);

    const array: string[] = [];
    const lines = value.split('\n');
    lines.forEach((line: string) => {
      if (line.length > 0) array.push(line);
    });
    const input = array.join('<br/><br/>');
    console.log(input);

    const rs = await prisma.komentar.create({
      data: {
        id: cuid.slug(),
        userId: userId,
        projectId: projectId,
        type: type,
        value: input,
      },
    });

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
