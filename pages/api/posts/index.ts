import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get all
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({ orderBy: { id: 'desc' } });
    return res.status(200).json(posts);
  }
  // create new post
  if (req.method === 'POST') {
    const data = req.body;
    if (!data.title) {
      return res.status(400).json({ error: 'Post is missing title' });
    }
    const post = await prisma.post.create({ data });
    return res.status(201).json(post);
  }
  // unsupported routes
  return res.status(400).json({ error: 'Unsupported route' });
}
