const express = require("express");
const router = express.Router();
const useControler = require("../controler/userControler.js");
const salesControler = require("../controler/salesControler.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("../services/authMiddleware.js");

router.use(cookieParser());

router.use(
  cors({
    origin: "http://192.168.124.35:3000",
    credentials: true,
  })
);

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.124.35:3000"); // Altere para o seu domínio React
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

router.post("/login", useControler.loginUsuario);

router.post("/sendemail/:id", salesControler.enviarEmailVenda);

router.use(authMiddleware);

router.post("/register", useControler.criarUsuario);

router.get("/user/:id", useControler.listaUsuarioPorId);

router.get("/home/user", useControler.listarUsuarios);

router.get("/home/sales", salesControler.listarVendas);

router.post("/registersales", salesControler.registrarVenda);

router.put("/edituser/:id", useControler.editarUsuario);

router.delete("/deleteuser", useControler.deletarUsuario);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout bem-sucedido" });
});

router.put("/resetpassword/:id", useControler.resetarSenha);

module.exports = router;
