// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.query?.name;
  res.status(200).json({
    name: `Hello ${req.query?.name ? req.query?.name : 'Alex Patterson'}`,
  });
}
