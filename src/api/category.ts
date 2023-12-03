import request from "./request";


export function getCategoryList(params: object){
    return request.get('/category/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}

export function getCategoryTree(){
    return request.get('/category/tree').then((res)=>{
        console.log(res);
        return res
    })
}

export function saveCategoryApi(params: object){
    return request.post('/category/save',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getCategoryInfoApi(id: number | string){
    return request.get('/category/'+id).then((res)=>{
        console.log(res);
        return res
    })
}


export function updateCategoryInfoApi(data:object){
    return request.put('/category/update',data).then((res)=>{
        console.log(res);
        return res
    })
}

export function deleteCategoryApi(id: number | string){
    return request.get('/category/delete/'+id).then((res)=>{
        console.log(res);
        return res
    })
}

 
