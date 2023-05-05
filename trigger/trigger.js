//定时执行，解析payload
//接近对应时间的时候狂发请求
//按照payload的先后顺序判定优先级

const api = {
    submit: 'http://localhost:3000/api/submit',
    YZYMFQ: 'http://localhost:3000/api/csrfToken',
    IO: 'http://localhost:3000/api/io',
}
  
const axios = require("axios");
const promises = require("fs/promises");
const __dirname__ = process.cwd();

const getPayload = async() => {
    const f = await promises.readFile( __dirname__ + '/trigger/.config', 'utf8');
    const lines = f.split('\n');
    const payload = lines.map(v=>JSON.parse(Buffer.from(v, 'base64').toString('utf8')))
    
    return payload
}


const fuckCiu = async (threadIndex ) => {
    const payload = await getPayload();
    
    payload.map(async (load, index) => {
        try{
      
            const {
                cookie,
                week,
                bookdate,
                stepId,
                csrf,
                space,
                spaceIdx,
                lxpromises,
                id,
                name
            } = load;
            
            const _YZYMFQ = await axios.post(api.YZYMFQ, {
                cookie: cookie,
                csrfToken: csrf,
                stepId: stepId,
            })
            
            const res = await axios.post(api.submit, {
                cookie,
                week,
                bookdate,
                stepId,
                csrf,
                space,
                spaceIdx,
                lxpromises,
                YZYMFQ: _YZYMFQ.data,
                id,
                name
            })  
            if(res.data.ecode==='SUCCEED')
            {
                console.log('thread', threadIndex, payload, index, 'success，成功预约')
            }else
            {
                console.log('thread', threadIndex,'payload', index, 'fail', res.data.error)
            } 
        }catch(e){
            console.log('thread', threadIndex,'payload', index, 'fail 由于请求中断导致，请检查预约信息是否准确')
        };

        
    })
}

const INTERVAL = 500;
// 请求的时间间隔，单位为毫米


setInterval(()=>fuckCiu(0), INTERVAL);

setInterval(()=>fuckCiu(1), INTERVAL);

setInterval(()=>fuckCiu(2), INTERVAL);
