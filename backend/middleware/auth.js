import jwt from "jsonwebtoken";

const protectedRoute = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id; // Set the user ID on the request object

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export { protectedRoute };
