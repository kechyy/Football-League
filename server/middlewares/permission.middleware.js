const AdminCheck = (req, res, next) => {
  const { isAdmin } = req.userInfo;
  if (isAdmin) {
    return next();
  }
  return res.status(403).json({ status: 403, message: 'Unauthorized User, Please contact the administrator.' });
};
export default AdminCheck;
