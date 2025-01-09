class Response {
  constructor(statusCode, message, data) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}


export default Response