// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCsrfToken, getUrl } from "./utils/getUrls";
type Data = {
  csrf: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const csrf = await getCsrfToken(req.body.cookie)
  res.status(200).json({ csrf: csrf })
}

export default handler;