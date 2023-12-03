import request from "./request";


export function getUserList(params: object){
    return request.get('/user/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}
export function getUserAll(){
    return request.get('/user/list').then((res)=>{
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

export function addAccountApi(params: object){
    return request.post('/user/account',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getUserInfoApi(id: number | string){
    return request.get('/user/'+id).then((res)=>{
        console.log(res);
        return res
    })
}


export function updateUserInfoApi(data:object){
    return request.post('/user/update',data).then((res)=>{
        console.log(res);
        return res
    })
}

export function deleteUserApi(id: number | string){
    return request.get('/user/delete/'+id).then((res)=>{
        console.log(res);
        return res
    })
}
