// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  getYZYMFQ from "./utils/getYZYMFQ";
type Data = string
const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    cookie,
    stepId,
    csrfToken,
  } = req.body
  const sub = await getYZYMFQ(cookie, csrfToken, stepId)
  
  res.status(200).json(sub)
}

export default handler;