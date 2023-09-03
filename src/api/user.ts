import request from "./request";


export function getUserList(params: object){
    return request.get('/user/page',{params}).then((res)=>{
        console.log(res);
        return res
    })
}
