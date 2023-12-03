import request from "./request";


export function getBorrowList(params: object){
    return request.get('/borrow/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}

export function saveBorrowApi(params: object){
    return request.post('/borrow/save',params).then((res)=>{
        console.log(res);
        return res
    })
}

export function getBorrowInfoApi(id: number | string){
    return request.get('/borrow/'+id).then((res)=>{
        console.log(res);
        return res
    })
}


export function updateBorrowInfoApi(data:object){
    return request.put('/borrow/update',data).then((res)=>{
        console.log(res);
        return res
    })
}

export function deleteBorrowApi(id: number | string){
    return request.get('/borrow/delete/'+id).then((res)=>{
        console.log(res);
        return res
    })
}

 
