import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let id = Number(req.query.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id needs to be a number' });
  }

  // get one
  if (req.method === 'GET') {
    let post;
    try {
      post = await prisma.post.findUnique({ where: { id } });
    } catch (e: any) {
      console.log(e.meta.cause);
    }
    if (!post) {
      return res.status(400).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  }

  // patch one
  if (req.method === 'PATCH') {
    const data = req.body;
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    return res.status(200).json(post);
  }
  // delete one
  if (req.method === 'DELETE') {
    let post;
    try {
      post = await prisma.post.delete({ where: { id } });
    } catch (e: any) {
      return res.status(400).json({ error: e.meta.cause });
    }
    return res.status(200).json(post);
  }
  // unsupported routes
  return res.status(400).json({ error: 'Unsupported route' });
}
