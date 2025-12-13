
export default function CookieGenerator(res, name, content, maxAge) {
    console.log("llega a la coki",name,content)
    return res.cookie(
        name, content, 
        {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: maxAge
    })
}