import axios, { AxiosInstance } from 'axios'

const instance = (cookie: string):AxiosInstance => { 
    return axios.create({
    baseURL: 'https://usc.gzhu.edu.cn/infoplus',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'Origin': 'https://usc.gzhu.edu.cn',
        'Cookie': cookie,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        'Referer': 'https://usc.gzhu.edu.cn/infoplus/form/2242445/render'
    }
})
}

export { instance };