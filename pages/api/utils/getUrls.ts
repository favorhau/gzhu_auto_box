import { instance } from './instance'


const getCsrfToken = async (cookie: string):Promise<string> => {
    const res = await instance(cookie).get('/form/TYCDYY/start');

    const re = new RegExp('(?<=csrfToken\" content=\").*.(?=\">)')
    const t = re.exec(res.data)
    if(t!==null)
    {
        return t[0]
    }else
    {
        return ''
    }
}


const getUrl = async (cookie: string, csrfToken: string):Promise<string> => {

    const params = new URLSearchParams();
    params.append('csrfToken', csrfToken);
    params.append('idc', 'TYCDYY');
    params.append('release', '');

    const res = await instance(cookie).post('/interface/start', params);

    // return res.data.entities[0]
    // TODO
    return 'https://usc.gzhu.edu.cn/infoplus/form/2643367/render' //调试
}

export { getCsrfToken, getUrl } ;