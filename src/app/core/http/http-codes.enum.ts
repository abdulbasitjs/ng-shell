export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  Found = 302,
  SeeOther = 303,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
}

export enum ProjectStatusCode {
  AccessRevoked = 2504,
  ValidationFailed = 2600,
  InviteValidationFailed = 2500,
  UserNotFound = 2501,
  ScriptBroken = 500
}
