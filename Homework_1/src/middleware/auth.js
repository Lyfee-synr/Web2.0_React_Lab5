import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
  const auth = req.headers.authorization || "";
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lưu thông tin user vào request
    req.user = { id: decoded.sub, username: decoded.username, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
