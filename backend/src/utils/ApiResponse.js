class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 300 ? true : false;
  }
}
export { ApiResponse };
