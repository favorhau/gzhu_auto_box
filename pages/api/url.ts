// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUrl } from "./utils/getUrls";
type Data = {
  url: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const url = await getUrl(req.body.cookie, req.body.csrf)
  res.status(200).json({ url: url })
}

export default handler;