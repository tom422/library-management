import request from "./request";


export function getBookList(params: object){
    return request.get('/book/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}


export function getBookAll(){
    return request.get('/book/list').then((res)=>{
        console.log(res);
        return res
    })
}

export function saveBookApi(params: object){
    return request.post('/book/save',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getBookInfoApi(id: number | string){
    return request.get('/book/'+id).then((res)=>{
        console.log(res);
        return res
    })
}


export function updateBookInfoApi(data:object){
    return request.put('/book/update',data).then((res)=>{
        console.log(res);
        return res
    })
}

export function deleteBookApi(id: number | string){
    return request.get('/book/delete/'+id).then((res)=>{
        console.log(res);
        return res
    })
}

 
