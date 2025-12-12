import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import modelLogin from "../model/login.model.js";
import { emitLoginToAdmins } from "../socket.js";


const createToken = (payload, expiresIn) =>
jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const setCookie = (res, name, value, maxAge) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge,
  });
};


export const login = async (req, res) => {
  try {
    const { user_nombre, user_password } = req.body;

    if (!user_nombre || !user_password) {
      return res.status(400).json({
        login: false,
        message: "Usuario y contraseña son requeridos",
      });
    }

    const user = await modelLogin.getUserByUsername(user_nombre);

    if (!user || user.estado !== 1) {
      return res.status(401).json({ login: false, message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) {
      return res.status(401).json({ login: false, message: "Credenciales inválidas" });
    }

    const userPermissions = await modelLogin.getUserPermissions(user.id);

    const rol = await modelLogin.getUserRoles(user.id);
    console.log(rol);
    const payload = {
      id: user.id,
      user_nombre,
      rol: rol.rol_nombre,
    };


    const accessToken = createToken(payload, "15m");
    const refreshToken = createToken(payload, "4h");

    setCookie(res, "auth_token", accessToken, 15 * 60 * 1000);
    setCookie(res, "refresh_token", refreshToken, 4 * 60 * 60 * 1000);


    emitLoginToAdmins(user_nombre);

    return res.status(200).json({
      login: true,
      userPermissions,
      rol: rol.rol_nombre,
      first_time: !user.security_code,
      user_name: user_nombre,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      login: false,
      message: "Error interno del servidor",
      error: error.message,
    });
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
