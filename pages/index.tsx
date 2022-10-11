import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Typography, TextField, Box, Breadcrumbs, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration'
import axios from 'axios';
import StringAvatar from './component/StringAvatar';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomizedSnackbars from './component/Alert'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DatePicker from './component/DatePicker';
import InteractiveList from './component/List'

dayjs.extend(duration)

const api = {
  csrfToken: '/api/csrfToken',
  url: '/api/url',
  userInfo: '/api/userInfo',
  space: '/api/space',
  submit: '/api/submit'
}

const Home: NextPage = () => {
  const [count, setCount] = useState(0)
  const [su, setSuper] = useState(false);
  const [diffTime, setDiffTime] = useState(-1);
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useState('')
  const [url, setUrl] = useState(undefined)
  const [csrf, setCsrf] = useState(undefined)
  const [stepId, setStepId] = useState('')
  const [finishStep, setFinish] = useState(0)
  const [place, setPlace] = useState('')
  const [open, setOpenErrorTips] = useState(false)
  const [tips, setTips] = useState('')
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(),
  );
  const [space, setSpace] = useState<{
    chooseProject: Array<string>
    rawProject: Array<any>
  }>({
    chooseProject: [''],
    rawProject: [{}]
  })
  const [spaceIdx, setSpaceIdx] = useState(0)
  
  const [userInfo, setUserInfo] = useState({
    name: undefined,
    id: undefined
  })
  
  
  const handleDiffTime = () => {
  
    //目标时间
    const objectClock = {
      h: 12,
      m: 29,
      s: 58
    }
   
    const formatDate:Dayjs = date?.set('hour', objectClock.h).set('minute', objectClock.m).set('second', objectClock.s)??dayjs()

    const diff = formatDate.diff(dayjs().add(su?9999:1, 'day'), 'second')
    setDiffTime(diff)
  }
  
  useEffect(() => {
    const interval =  setInterval(()=>{
      handleDiffTime()
    }, 1000)
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, su]);
  
  //处理请求
  const handleClick = async () => {
    setLoading(true)
    
    if(step ===0)
    {
      //登录阶段
      const _csrf = await axios.post(api.csrfToken, {
        cookie
      })
      
      if(_csrf.data.csrf ==='') {
        setTips('登录cookie有误 请重试')
        setOpenErrorTips(true)
        setLoading(false)
        return
      }
      setCsrf(_csrf.data.csrf)
      
      const _url = await axios.post(api.url, {
        cookie,
        csrf: _csrf.data.csrf
      })
      setUrl(_url.data.url)
      console.log(_url.data.url)
      if(_url.data.url.indexOf('task=all') !== -1)
      {
          setTips(`已经有进行的申请, 需等待系统取消, 任务链接: ${_url.data.url}`)
          setOpenErrorTips(true)
          setLoading(false)
          return
      }else
      {
        const stepid = (new RegExp('m/(.+)/rend').exec(_url.data.url)??[''])[1]
        setStepId(stepid)
        console.log('获取stepid成功:', stepid)
      }
      const _userInfo = await axios.post(api.userInfo, {
        cookie,
        url: _url.data.url
      })
      
      setUserInfo(_userInfo.data)
      
      setFinish(1)
      setStep(1)

    }else if(step ===1)
    {
      if(!place)
      {
        setTips(`请选择场馆`)
        setOpenErrorTips(true)
        setLoading(false)
      }else
      {
        setLoading(false)
        setFinish(2)
        setStep(2)
      }
    }else if(step === 2)
    {
    
      const week = ['周日', '周一', '周二', '周三', '周四', '周四', '周五', '周六'][dayjs(date).get('day')]
      const postDate = dayjs(date).format('YYYY-MM-DD')
      const spaceData = { cookie, stepId, csrf, week, postDate, place}
      const space = await axios.post(api.space, spaceData)
      setSpace(space.data)
      
      setLoading(false)
      setFinish(3)
      setStep(3)
    }else if(step === 3)
    {
      setLoading(false)
      setFinish(4)
      setStep(4)
    }else if(step === 4)
    {
    
      handleDiffTime()
      setLoading(false)
      
      //论没有mock interface的坏处
      // 周一
      const week = ['周日', '周一', '周二', '周三', '周四', '周四', '周五', '周六'][dayjs(date).get('day')]
      // 2022-09-10
      const bookdate = dayjs(date).format('YYYY-MM-DD')
      
      const submit = await axios.post(api.submit, {
        cookie,
        week,
        bookdate,
        stepId,
        csrf,
        space: space.rawProject,
        spaceIdx,
        ...userInfo
      })
      if(submit.data.ecode==='SUCCEED')
      {
        setLoading(false)
        setFinish(5)
        setStep(5)
      }else
      {
        setTips(`预约失败, ${submit.data.error}`)
        setOpenErrorTips(true)
        setLoading(false)
      }
    }
    setLoading(false)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GZHU 明日羽毛球</title>
        <meta name="description" content="GZHU Tomorrow Badminton" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{marginTop: 4}}>
        <StringAvatar name={ userInfo.name ?? ''} />
      </Box>
      <div className={styles.main}>
          <Image src={'/badminton.svg'} alt='' width={90} height={90} onClick={()=>{
            if(count >= 4)
            {
              console.log('Welcome super!')
              setSuper(true)
            }
            setCount(count+1)
           
          }}></Image>
          <Typography sx={{
            fontWeight: 'bold',
            padding: 2
          }} align='center' variant='h4'>GZHU 明日羽毛球</Typography>
          { ['00', '01', '02', '03', '04', '05', '06', '07', '08'].indexOf(dayjs().format('HH'))!==-1 &&
            <Typography sx={{color: 'red'}} align='center' variant='subtitle2'>
                {/* //禁止访问时间 */}
                00:00-08:00为预约服务器禁止访问时间
            </Typography>
            }
          
          <Box sx={{maxWidth: 300, width: '100%', display: 'flex', paddingY: 2}}>
          <Breadcrumbs aria-label="breadcrumb">
          <Link
             color={ step === 0?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(0)
            }}
          >
            登录
          </Link>
          {
            finishStep>0 && <Link
              color={ step === 1?'#3f50b5':'inherit' } 
                href='#'
                underline="hover"
              onClick={()=>{
                setStep(1)
              }}
            >
              场馆
            </Link>
          }
          {
            finishStep>1 && <Link
             color={ step === 2?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(2)
            }}
          >
            时间
          </Link>
          }
          {
            finishStep>2 && 
          <Link
             color={ step === 3?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(3)
            }}
          >
            场地
          </Link>
          }
          {
            finishStep>3 &&  <Link
              color={ step === 4?'#3f50b5':'inherit' } 
              href='#'
              underline="hover"
            onClick={()=>{
              setStep(4)
            }}
          >
            提交
          </Link>
          }
          </Breadcrumbs>
          </Box>
         
          <Box sx={{ maxWidth: 400 }}>

              <Box sx={{ display: (step === 0?'flex':'none')}} 
                
                flexDirection='column' 
                alignItems={'center'}
                justifyItems={'center'}
              >
                <TextField sx={{ width: 300 }} id="outlined-basic" onChange={(e)=>{
                setCookie(e.target.value)}} 
                label="Cookie" 
                placeholder='Cookie'
                variant="filled" />
                
                <Link sx={{marginTop: 2}} underline='none' target="_blank" href={'/help'}>如何获取Cookie?</Link>
              </Box>
              <Box sx={{display: (step === 1?'':'none') }}>
              <FormControl sx={{mt:1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Place</InputLabel>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={place}
                label="场馆"
                sx={{
                  width: 300 , 
                }}
                onChange={(e)=>{
                  setPlace(e.target.value)
                }}
              >
                <MenuItem value={'风雨跑廊羽毛球场'}>风雨跑廊羽毛球场</MenuItem>
                <MenuItem value={'体育馆羽毛球场'}>体育馆羽毛球场</MenuItem>
              </Select>
              </FormControl>
                
              </Box>
              
              <Box sx={{display: (step === 2?'':'none') }}>
              <DatePicker date={date} handleDateChange={(newValue: Dayjs | null)=>{
                {
                  setDate(newValue)
                }
              }}/>
              
              </Box>
              
              
              {step === 3 && <Box sx={{display: (step === 3?'':'none') }}>
              <FormControl sx={{mt:1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Place</InputLabel>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={spaceIdx}
                label="场地"
                sx={{
                  width: 300 , 
                }}
                onChange={(e)=>{
                  setSpaceIdx(e.target.value as number)
                }}
              >
                { space?.chooseProject.map((x, idx)=>{
                    return(
                      <MenuItem key={idx} value={idx} sx={{color: x.indexOf('已预约') !==-1 ? 'red': 'green'}}>{x}</MenuItem>
                    )
                }) }

              </Select>
              </FormControl>
              </Box>}
              {step === 4&& <Box sx={{display: (step === 4?'':'none') }}>
                 <InteractiveList 
                 name={userInfo.name} 
                 id={userInfo.id} 
                 bookDate={dayjs(date)} 
                 bookTime={space.rawProject[spaceIdx].sJD}
                 place={space.rawProject[spaceIdx].yYDD}
                 space={space.rawProject[spaceIdx].yYCD}
                 ></InteractiveList>
                <Typography sx={{marginTop: 1}} align='center' variant='subtitle2' color='red'>提交成功需要约24小时才能重新预约</Typography>
              </Box> }
              {step === 5&& <Box sx={{
              display: (step === 5?'flex':'none')
              }}
              flexDirection='column' 
              alignItems={'center'}
              justifyItems={'center'}
              marginTop={2}
              >
                <Typography align='center' variant='h3' color='green'>预约成功</Typography>
                <Link sx={{marginTop: 2}} target="_blank" href={url}>点此查看预约详情</Link>
              </Box>
              }
              <LoadingButton 
              size="large"
              onClick={handleClick}
              variant="outlined"
              sx={{
                marginTop: 3,
                width: 300
              }}
              disabled={step === 4 && diffTime>0}
              loading={loading}>{ step === 4 ? (diffTime<=0?'提交':((): string => {
                const h = Math.floor((diffTime/3600)) 
                const m = Math.floor(((diffTime-h*3600)/60))
                const s = diffTime%60
                return `${h}时${m}分${s}秒后开启`
              })()): '下一步' }  </LoadingButton>
              <CustomizedSnackbars tips={tips} open={open}  setOpen={setOpenErrorTips}/>
          </Box>
          
      </div>
      
    </div>
  )
}

export default Home
