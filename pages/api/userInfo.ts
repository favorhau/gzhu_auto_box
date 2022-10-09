// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  getUser from "./utils/getUser";
type Data = {
  name: string,
  id: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { name, id } = await getUser(req.body.cookie, req.body.url)
  
  res.status(200).json({ name,  id })
}

export default handler;