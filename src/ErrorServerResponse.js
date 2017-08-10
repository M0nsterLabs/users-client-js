function ErrorServerResponse(statusCode, statusText, message = null) {
  this.name = 'Not Found';
  this.statusCode = statusCode;
  this.statusText = statusText;
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ErrorServerResponse);
  } else {
    this.stack = (new Error()).stack;
  }
}

ErrorServerResponse.prototype = Object.create(Error.prototype);
export default ErrorServerResponse;
