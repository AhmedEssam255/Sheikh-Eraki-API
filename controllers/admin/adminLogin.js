const login = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });

    req.session.isLoggedIn = true;

    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });

    res.on('finish', () => {
  console.log('FINAL RESPONSE DIAGNOSTICS:', {
    setCookie: res.getHeader('Set-Cookie'),
    secure: req.secure,
    protocol: req.protocol,
    forwardedProto: req.get('x-forwarded-proto'),
    sessionID: req.sessionID,
    cookieSecure: req.session.cookie.secure,
    isLoggedIn: req.session.isLoggedIn,
  });
});

    return res.status(200).json({
      message: 'Login successful',
      isLoggedIn: true,
    });
  } catch (error) {
    error.status = error.status || 500;
    throw error;
  }
};

export { login };
