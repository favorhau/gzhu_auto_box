// I/O
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    
}

const __dirname__ = process.cwd();

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data | {}>
) => {
    const { method, payload } = req.body;

    if(method === 'add'){
        const f = await fs.readFile( __dirname__ + '/trigger/.config', 'utf-8');
        const rawJSON = JSON.stringify(payload)
        fs.writeFile( __dirname__ + '/trigger/.config' , f + '\n' + Buffer.from(rawJSON).toString('base64'));

        res.status(200).json({write:  Buffer.from(rawJSON).toString('base64')});
    }else{
        const f = await fs.readFile( __dirname__ + '/trigger/.config', 'utf8');
        const lines = f.split('\n');
        const rawJSON = lines.map(v=>`<h1>${
            (() => {
                const payload = JSON.parse(Buffer.from(v, 'base64').toString('utf8'));
                if(payload.space){
                    return `user: ${payload.name}  bookdate: ${payload.bookdate} space: ${JSON.stringify(payload.space[Number(payload.spaceIdx)])}`
                }
            })()
        }</h1>`)
        .join('\n');

        res.status(200).send(
        `
        <head>
            <meta charset="UTF-8">
        </head>
        ${rawJSON}`);
    }
//   const url = await getUrl(req.body.cookie, req.body.csrf)
}

export default handler;