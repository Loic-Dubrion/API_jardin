const sanitizer = require('sanitize');

const sanitizeInput = (value) => {
  if (typeof value === 'string') {
    return sanitizer.escape(value);
  } if (Array.isArray(value)) {
    return value.map(sanitizeInput);
  } if (typeof value === 'object' && value !== null) {
    for (const propName in value) {
      value[propName] = sanitizeInput(value[propName]);
    }
  }
  return value;
};

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    for (const propName in req.body) {
      req.body[propName] = sanitizeInput(req.body[propName]);
    }
  }
  next();
};

module.exports = bodySanitizer;
