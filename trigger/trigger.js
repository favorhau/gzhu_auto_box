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


const INTERVAL = 1000;
// 请求的时间间隔，单位为毫米，建议设置为1000

// 时
const HH = 12;
// 分
const MM = 30;
// 秒
const SS = 0;

//时间补偿，单位为秒，也就是说比如说我设定12点30 00秒 ，那么我12点29 58秒到 12点 30分 02 秒前后时间都会狂发请求
const offset = 2;

const timeTrigger = () => {
    const now = new Date()
    const hours = now.getHours();
    const mins = now.getMinutes();
    const sec = now.getSeconds();
    
    const cur = hours * 60 * 60 + mins * 60 + sec;
    const tri = HH * 60 * 60 + MM * 60 + SS;
    
    return Math.abs(cur-tri)<=offset;
}

console.log('下一次抢球时间为 ', `${HH}: ${MM}: ${SS}`)

//这个是多线程操作，现在有3个线程，如果想要多个线程，可以复制粘贴 setInterval(()=>timeTrigger()?fuckCiu(1):'', INTERVAL); 
// 其中这里的 fuckCiu(1) 这个 1 只是给他编号，你可以改为随便一个数字
setInterval(()=>timeTrigger()?fuckCiu(0):'', INTERVAL);

setInterval(()=>timeTrigger()?fuckCiu(1):'', INTERVAL);

setInterval(()=>timeTrigger()?fuckCiu(2):'', INTERVAL);
