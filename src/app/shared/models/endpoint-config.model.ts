export interface EndpointConfig {
  baseUrl: string;
  name: string;
  api: string;
  path: string;
  isPollable: boolean;
  runAt: string;
  hideLoader?: boolean;
}
