import request from "./request";


export function getUserList(params: object){
    return request.get('/user/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}

export function saveUserApi(params: object){
    return request.post('/user/save',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getUserInfoApi(params: object){
    return request.post('/user/save',params).then((res)=>{
        console.log(res);
        return res
    })
}