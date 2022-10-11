// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  checkProject from "./utils/checkProject";
type Data = {
  chooseProject: Array<string>
  rawProject: Array<any>
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  const project = await checkProject(req.body.cookie, req.body.stepId,  req.body.csrf, req.body.week, req.body.postDate,req.body.place )
  
  res.status(200).json(project)
}

export default handler;