const logout = async (req, res, next) => {
  try {
    if (req.session) {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            return reject(err);
          }

          resolve();
        });
      });
    }

    res.clearCookie('connect.sid', {
      path: '/',
    });

    return res.status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

export { logout };
