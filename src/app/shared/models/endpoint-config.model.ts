export interface EndpointConfig {
  baseUrl: string;
  name: string;
  api: string;
  path: string;
  noToken?: boolean;
  runAt: string;
  hideLoader?: boolean;
}
