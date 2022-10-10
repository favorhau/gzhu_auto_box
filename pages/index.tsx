import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Typography, TextField, Box, Breadcrumbs, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import axios from 'axios'

const api = {
  csrfToken: '/api/csrfToken',
  url: '/api/url',
  userInfo: '/api/userInfo',
  
}

const Home: NextPage = () => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useState('')
  const [url, setUrl] = useState(undefined)
  const [csrf, setCsrf] = useState(undefined)
  const [userInfo, setUserInfo] = useState({
    name: undefined,
    id: undefined
  })
  
  
  //处理请求
  const handleClick = async () => {
    setLoading(true)
    
    if(step ===0)
    {
      //登录阶段
      const _csrf = await axios.post(api.csrfToken, {
        cookie
      })
      setCsrf(_csrf.data.csrf)
      
      const _url = await axios.post(api.url, {
        cookie,
        csrf: _csrf.data.csrf
      })
      setUrl(_url.data.url)
      console.log(_url.data.url)
      if(_url.data.url.indexOf('task=all') !== -1)
      {
          setTips(`已经有进行的申请 需等待系统注销: ${_url.data.url}`)
          setOpenErrorTips(true)
          setLoading(false)
          return
      }else
      {
        const stepid = (new RegExp('m/(.+)/rend').exec(_url.data.url)??[''])[1]
        setStepId(stepid)
        console.log('获取stepid成功:', stepid[0])
      }
      const _userInfo = await axios.post(api.userInfo, {
        cookie,
        url: _url.data.url
      })
      alert(_userInfo.data.name)
      

    }else if(step ===1)
    {
      return
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
      <div className={styles.main}>
          <Image src={'/badminton.svg'} alt='' width={90} height={90}></Image>
          <Typography sx={{
            fontWeight: 'bold',
            padding: 2
          }} align='center' variant='h4'>GZHU 明日羽毛球</Typography>
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
          <Link
             color={ step === 1?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(1)
            }}
          >
            场馆
          </Link>
          <Link
             color={ step === 2?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(2)
            }}
          >
            预约时间
          </Link>
          <Link
             color={ step === 3?'#3f50b5':'inherit' } 
             href='#'
             underline="hover"
            onClick={()=>{
              setStep(3)
            }}
          >
            预约场地
          </Link>
          </Breadcrumbs>
          </Box>
         
          <Box sx={{ maxWidth: 400 }}>
              <div>
                <TextField sx={{ width: 300 }} id="outlined-basic" onChange={(e)=>{
                setCookie(e.target.value)}} label="Cookie" placeholder='Cookie' variant="filled" />
              </div>
              <LoadingButton 
              size="large"
              onClick={handleClick}
              variant="outlined"
              sx={{
                marginTop: 3,
                width: 300
              }}
              loading={loading}> 下一步 </LoadingButton>
          </Box>
          
      </div>
      
    </div>
  )
}

export default Home
