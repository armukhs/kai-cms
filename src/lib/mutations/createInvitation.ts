import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';
import nodemailer from 'nodemailer';

export default async function createInvitation(req: NextApiRequest, res: NextApiResponse) {
  console.log(Date.now());

  try {
    const { fromName, fromEmail, nama, nipp, email, jabatan, jabatanId, roles, unitId } = req.body;
    const rs = await prisma.invitation.create({
      data: {
        fromName: fromName,
        fromEmail: fromEmail,
        nama: nama,
        nipp: nipp,
        email: email,
        jabatan: jabatan,
        jabatanId: jabatanId,
        unitId: unitId,
        roles: roles,
      },
    });

    // Early respond
    res.json(rs);

    const transport = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    var mailOptions = {
      from: '"KAI Mail" <ptkj@hotmail.com>',
      to: email,
      subject: 'KAI Nodemailer',
      text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
    };

    // transport.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log('Message sent: %s', info.messageId);
    // });
    const mailrs = await transport.sendMail(mailOptions);
    console.log(Date.now(), mailrs);

    // res.json(mailrs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
