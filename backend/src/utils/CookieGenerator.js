
export default function CookieGenerator(res, name, content, maxAge) {
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