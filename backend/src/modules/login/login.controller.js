import { emitLoginToAdmins } from "../../socket.js";
import CookieGenerator from "../../utils/CookieGenerator.js";
import { loginService } from "./login.service.js";

export const login = async (req, res, next) => {
  try {
    const { user_nombre, user_password } = req.body;
    const { accessToken, refreshToken, userPermissions, rol, user } =
      await loginService.login({ user_nombre, user_password });

    CookieGenerator(res, "auth_token", accessToken, 15 * 60 * 1000);
    CookieGenerator(res, "refresh_token", refreshToken, 4 * 60 * 60 * 1000);

    emitLoginToAdmins(user_nombre);

    return res.status(200).json({
      login: true,
      userPermissions,
      rol: rol.rol_nombre,
      first_time: !user.security_code,
      user_name: user_nombre,
    });

  } catch (error) {
      next(error);
  }
};

export const logOut = (req, res) => {
  try {
    const cookiesToClear = ["auth_token", "refresh_token"];

    cookiesToClear.forEach((cookieName) =>
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
    );

    return res.status(200).json({ logout: true });

  } catch (error) {
    return res.status(500).json({
      logout: false,
      message: "Error al cerrar sesión",
    });
  }
};

export default { login, logOut };
