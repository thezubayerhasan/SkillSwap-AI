const validate = (schema) => (req, res, next) => {
  const { error } = schema.safeParse
    ? (() => { const result = schema.safeParse(req.body); return { error: result.success ? null : result.error }; })()
    : schema.validate(req.body);

  if (error) {
    res.status(400);
    return next(new Error(error.errors?.[0]?.message || error.details?.[0]?.message || 'Validation error'));
  }
  next();
};

export default validate;
