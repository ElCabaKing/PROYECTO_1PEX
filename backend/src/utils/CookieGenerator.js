
export default function CookieGenerator(res,name,content,maxAge){
    return res.cookies(name,content,{maxAge: maxAge})
}