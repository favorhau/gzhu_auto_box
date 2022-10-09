import { instance } from './instance'


const getUser = async (cookie: string, url: string) => {

    const res = await instance(cookie).get(url)

    // const projects = JSON.parse(res.data.entities[0]).cDXXList ;
    const name = (new RegExp('(?<=name\":\").+(?="})').exec(res.data)??[''])[0]
        const id = (new RegExp('(?<=account\":\").+(?=","e)').exec(res.data)??[''])[0]
    return {
        name,
        id
    }
    // return res.data.entities[0].data
}

export default getUser;
