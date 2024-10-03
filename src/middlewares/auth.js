// src/middlewares/auth.js

import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Se não houver token, permitir que a requisição prossiga sem autenticação
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona o usuário à requisição
    next();
  } catch (err) {
    console.error('Token inválido');
    res.status(401).json({ msg: 'Token inválido' });
  }
}
