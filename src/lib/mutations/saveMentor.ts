import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

export default async function saveMentor(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, mentorId } = req.body;
  console.log(projectId, mentorId);

  try {
    const rs = await prisma.project.update({
      where: { id: projectId },
      data: {
        mentorId: mentorId,
      },
    });

    console.log('RS', rs);

    res.json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
