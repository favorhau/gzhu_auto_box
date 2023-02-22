// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  submit from "./utils/submit";
type Data = {
  rawText: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    cookie,
    week,
    bookdate,
    stepId,
    csrf,
    space,
    spaceIdx,
    id,
    name,
    lxfs
  } = req.body
  const sub = await submit(cookie, week, bookdate, stepId, csrf, space, spaceIdx, id, name, lxfs)
  
  res.status(200).json(sub)
}

export default handler;