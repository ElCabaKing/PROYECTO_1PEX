const isProd = process.env.NODE_ENV === "production";

export function cookieGenerator(res, tokenName, token) {
  return res.cookie(tokenName, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
}