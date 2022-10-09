import { instance } from './instance'
import qs from 'qs'


const checkProject = async (cookie: string, stepid: string, csrfToken: string, week: string, date: string, place: string) => {
    const data = qs.stringify({
        'formData': JSON.stringify({
            "groupCDXXList": [],
            "fieldSF": "本科生",
            "fieldXY": "0206",
            "fieldLXFS": "",
            "fieldYYXM": "羽毛球",
            "fieldYYXM_Name": "羽毛球",
            "fieldXZDD": place,
            "fieldXZDD_Name": place,
            "fieldXZDD_Attr": "{\"_parent\":\"羽毛球\"}",
            "fieldYYRQ": week,
            "fieldYYRQ_Name": date,
            "fieldZJ": ""
        }),
        'fieldName':'fieldYYRQ',
        'fieldValue':week,
        'path': ' ',
        'boundFields':'fieldXH,fieldZJ,fieldFZPD,fieldYYXM,fieldXM,fieldSF,fieldSQSJ,fieldYYCD,fieldXY,fieldYYDD,fieldYYRQ,fieldSJD,fieldLXFS,fieldXZDD,fieldXZ,fieldTYXM,fieldYYZT',
        'csrfToken': csrfToken,
        'lang': 'en',
        'stepId': stepid,
        'workflowId': 'null',
    })

    const res = await instance(cookie).post('https://usc.gzhu.edu.cn/infoplus/interface/fieldChanging',data)

    const projects = JSON.parse(res.data.entities[0]).cDXXList ;
    
    return { 
        chooseProject: projects.map((x: any, idx: Number)=>{
            return  `${idx}|${x.tYXM} ${x.sJD} ${x.yYDD} ${x.yYCD} ${x.yYZT===''?'未预约':x.yYZT}`
        }),
        rawProject: projects
    }
    // return res.data.entities[0].data
}

export default checkProject;
