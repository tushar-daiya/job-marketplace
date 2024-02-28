export const ErrorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
      status: err.status || 500,
      success: false,
      message: err.message || "Internal Server Error",
    });
  };