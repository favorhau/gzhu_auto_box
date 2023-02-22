/**获取一个叫做 fieldYZYMFQ 的奇奇怪怪的 */
import { instance } from './instance'
import qs from 'qs'


const getYZYMFQ = async (cookie: string, csrfToken: string, stepId: string):Promise<string> => {

    const data = qs.stringify({
        stepId,
        csrfToken
    }) 
    const params = new URLSearchParams();
    params.append('stepId', stepId);
    params.append('csrfToken', csrfToken);

    const res = await instance(cookie).post('/interface/render', params);
    return `${(Math.cos(parseInt(res.data['entities']['data']['fieldLSH']))+10000)*1000}`
}

export default getYZYMFQ;