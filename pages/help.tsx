import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Head from 'next/head';
import Image from 'next/image'
import { Link, Typography} from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
        <Head>
        <title>Q&A</title>
        <meta name="description" content="GZHU Tomorrow Badminton Q&A" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>如何获取Cookie #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{color: 'orange'}}>
            首先说明一下，Cookie是用户标识。每一次预约都需要用电脑查Cookie（虽然手机也有相关功能）。查Cookie是有门槛的，不然人人都输入账号密码，人均抢场地，就没意思了。
          </Typography>
          <Typography >
            1. 使用浏览器(推荐Chrome)访问<Link href={'https://usc.gzhu.edu.cn/infoplus/form/TYCDYY/start'}>https://usc.gzhu.edu.cn/infoplus/form/TYCDYY/start</Link>，并通过统一验证登录。
          </Typography>
          <Typography >
            2. 打开开发者工具，选择Network（网络）栏。<Link href={'https://jingyan.baidu.com/article/a3aad71aca6a8ef0fb0096c1.html'}>开发者工具打开教程</Link>
          </Typography>
          <Image src={'/help/internet.png'} alt={""} width={680} height={300}></Image>
          <Typography >
            3. 刷新网页，选择第一个start栏目，往下拉，在Request Headers下面找到Cookie
          </Typography>
          <Image src={'/help/Cookie.png'} alt={""} width={680} height={300}></Image>
          <Typography >
            4. 复制Cookie进入程序网页即可以完成登录
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>明日羽毛球如何帮助快速预约 #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            因为学校设定的预约时间是从<b>中午12:30</b>开始，而后台服务器的刷新时间也正好是这个时候。对于其他用户，需要进行 进入网页、查看场地、选择场地、提交这几个过程。
            而我们明日羽毛球可以构造好请求的数据，一到能预约的时候，提交按钮就会变成蓝色，一键即可以发起预约。这个过程省去了几个步骤，只需要一个请求，所以这肯定会比其他人快一步的。
            当然如果提示已经被预约，则表示可能远处有某个机器快人一步了。所以如果真的是十分热门的场地，可以电脑一个明日羽毛球，手机一个，有一个备选方案，这样就可以大概率满足个人的需求了。
          </Typography>
          <Image src={'/help/clockTime.png'} alt={""} width={440} height={100}></Image>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>已经预约的场地怎么取消 #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            取消预约的场地现在可以去
            <Link href={'https://usc.gzhu.edu.cn/taskcenter/'}>https://usc.gzhu.edu.cn/taskcenter/</Link>查看自己的待办，
            但是如果取消的话这个事项只能重新选取场地（往往这时候的目标场地已经被约完了）。不过如果预约的场地自己不去最好也去待办里面进行取消。
            明日羽毛球预约后也同时可以快速查看预约表单，跟学校服务中心数据是同步的。
            但还是建议谨慎预约。
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>服务器异常 #4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            由于本服务器跟学校的服务器相互连通，因此对于学校服务器的维护时间<b>00:00-08:00</b> ，则同样无法通过我们进行预约，就会出现请求异常的状态。
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>联系作者 #5</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            为什么需要有GZHU 明日羽毛球？是因为受了朋友委托开发一个定时抢场地的程序。但是如果大家都在同一个时间抢场地，那么场地就会变成黄牛的时间，因此就回避了直接通过机器抢，而是通过这种「开天眼」的方式帮助羽毛球爱好者预约。
            
            如果想找到我，可以 <Link type='email'>favorhau@outlook.com</Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
