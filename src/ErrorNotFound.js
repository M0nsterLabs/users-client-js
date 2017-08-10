function ErrorNotFound(message = null) {
  this.name = 'Not Found';
  this.statusCode = 404;
  this.statusText = 'Not Found';
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ErrorNotFound);
  } else {
    this.stack = (new Error()).stack;
  }
}

ErrorNotFound.prototype = Object.create(Error.prototype);
export default ErrorNotFound;
