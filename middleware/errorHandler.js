export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.type === 'validation') {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};