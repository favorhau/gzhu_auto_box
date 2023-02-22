import { instance } from './instance'
import qs from 'qs'


const submit = async (cookie: string, week: string, date: string, stepid: string, csrfToken: string, projects: Array<any>, objectIdx: number, id: string, name: string, lxfs: string, YZYMFQ: string) => {


    const generateTime = projects.map(x=>x.sJD)
    const generateProject = projects.map(x=>x.tYXM)
    const generateyYCD = projects.map(x=>x.yYCD)
    const generateyYDD = projects.map(x=>x.yYDD)
    const generateyYZT = projects.map(x=>x.yYZT)
	let generateClick = projects.map(_=>false)
	generateClick[objectIdx]=true
	
	let generatefZPD = projects.map(x=>x.fZPD)
	
    const USERFORM_DATA = {
	"_VAR_EXECUTE_INDEP_ORGANIZE_Name": "学院",
	"_VAR_ACTION_ACCOUNT": id,
	"_VAR_ACTION_INDEP_ORGANIZES_Codes": "02",
	"_VAR_ACTION_REALNAME": name,
	"_VAR_ACTION_INDEP_ORGANIZES_Names": "学院",
	"_VAR_OWNER_ACCOUNT": id,
	"_VAR_ACTION_ORGANIZES_Names": "计算机科学与网络工程学院",
	"_VAR_STEP_CODE": "YYSQ",
	"_VAR_ACTION_ORGANIZE": "0206",
	"_VAR_OWNER_USERCODES": id,
	"_VAR_EXECUTE_ORGANIZE": "0206",
	"_VAR_EXECUTE_ORGANIZES_Codes": "0206",
	"_VAR_NOW_DAY": "22",
	"_VAR_ACTION_INDEP_ORGANIZE": "02",
	"_VAR_OWNER_REALNAME": name,
	"_VAR_ENTRY_TAGS": "13-场地服务,体育学院",
	"_VAR_ACTION_INDEP_ORGANIZE_Name": "学院",
	"_VAR_NOW": "1677056980",
	"_VAR_ACTION_ORGANIZE_Name": "计算机科学与网络工程学院",
	"_VAR_EXECUTE_ORGANIZES_Names": "计算机科学与网络工程学院",
	"_VAR_OWNER_ORGANIZES_Codes": "0206",
	"_VAR_ADDR": "202.192.18.69",
	"_VAR_URL_Attr": "{}",
	"_VAR_ENTRY_NUMBER": "817963",
	"_VAR_EXECUTE_INDEP_ORGANIZES_Names": "学院",
	"_VAR_ENTRY_NAME": "体育场地预约",
	"_VAR_STEP_NUMBER": "2246870",
	"_VAR_POSITIONS": `0206:02:${id}`,
	"_VAR_OWNER_ORGANIZES_Names": "计算机科学与网络工程学院",
	"_VAR_URL": "https://usc.gzhu.edu.cn/infoplus/form/2246870/render",
	"_VAR_EXECUTE_ORGANIZE_Name": "计算机科学与网络工程学院",
	"_VAR_EXECUTE_INDEP_ORGANIZES_Codes": "02",
	"_VAR_RELEASE": "true",
	"_VAR_EXECUTE_POSITIONS": `0206:02:${id}`,
	"_VAR_TODAY": "1662134400",
	"_VAR_NOW_MONTH": "9",
	"_VAR_ACTION_USERCODES": id,
	"_VAR_ACTION_ORGANIZES_Codes": "0206",
	"_VAR_URL_Name": "https://usc.gzhu.edu.cn/infoplus/form/TYCDYY/start",
	"_VAR_EXECUTE_INDEP_ORGANIZE": "02",
	"_VAR_NOW_YEAR": "2023",
	"groupCDXXList": projects.map(_=>-1),
	"fieldSF": "本科生",
	"fieldYZYMFQ":YZYMFQ,
	"fieldLSH":stepid,
	"fieldSQSJ": 1662179081,
	"fieldXM": id,
	"fieldXM_Name": name,
	"fieldXH": id,
	"fieldXY": "0206",
	"fieldXY_Name": "计算机科学与网络工程学院",
	"fieldLXFS": lxfs,
	"fieldYYXM": "羽毛球",
	"fieldYYXM_Name": "羽毛球",
	"fieldXZDD": generateyYDD[0],
	"fieldXZDD_Name": generateyYDD[0],
	"fieldXZDD_Attr": "{\"_parent\":\"羽毛球\"}",
	"fieldYYRQ": week,
	"fieldYYRQ_Name": date,
	"fieldZJ": week,
	"fieldSJD": generateTime,
	"fieldTYXM": generateProject,
	"fieldYYDD": generateyYDD,
	"fieldYYCD": generateyYCD,
	"fieldYYZT": generateyYZT,
	"fieldXZ": generateClick,
	"fieldFZPD": generatefZPD
    }
    const params: Object = {
        "stepId":stepid, 
        "actionId":1,
        "formData": JSON.stringify(USERFORM_DATA),
        "timestamp":1662179081,
        "rand":229.65473861451252,
        "boundFields":"fieldXH,fieldZJ,fieldFZPD,fieldYYXM,fieldXM,fieldLSH,fieldSF,fieldSQSJ,fieldYYCD,fieldXY,fieldYYDD,fieldYYRQ,fieldYZYMFQ,fieldSJD,fieldLXFS,fieldXZDD,fieldXZ,fieldTYXM,fieldYYZT",
        "csrfToken":csrfToken,
        "lang":"en",
        "remark": "",
        "nextUsers": "{}"
    }
    
    
    const res = await instance(cookie).post('https://usc.gzhu.edu.cn/infoplus/interface/doAction',qs.stringify(params))
    
    return res.data
    // console.log('\x1b[34m%s\x1b[0m', '---------------------------------------------------------------------------------')
    
    // for (var key in params) {
	// 	const value = params[key as keyof typeof params]
	// 	if( Object.prototype.toString.call(value) === '[object Object]' )
	// 	{
	// 		console.log(`formData:${JSON.stringify(value)}`)
	// 	}else
	// 	{
	// 		console.log(`${key}:${value}`)
	// 	}
		
	//   }
	//   console.log('\x1b[34m%s\x1b[0m', '------------------------请复制上述参数至postMan body-----------------------------')
	}


export default submit