function ErrorBadRequest(statusCode, statusText, message = null) {
  this.name = 'Bad Request';
  this.statusCode = statusCode;
  this.statusText = statusText;
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ErrorBadRequest);
  } else {
    this.stack = (new Error()).stack;
  }
}

ErrorBadRequest.prototype = Object.create(Error.prototype);
export default ErrorBadRequest;
