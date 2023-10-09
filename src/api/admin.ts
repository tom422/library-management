import request from "./request";


export function getAdminList(params: object){
    return request.get('/admin/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}

export function saveAdminApi(params: object){
    return request.post('/admin/save',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getAdminInfoApi(id: number | string){
    return request.get('/admin/'+id).then((res)=>{
        console.log(res);
        return res
    })
}


export function updateAdminInfoApi(data:object){
    return request.post('/admin/update',data).then((res)=>{
        console.log(res);
        return res
    })
}

export function deleteAdminApi(id: number | string){
    return request.get('/admin/delete/'+id).then((res)=>{
        console.log(res);
        return res
    })
}