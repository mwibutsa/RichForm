export interface FormData {
  title?: string;
  markdownText?: string;
  [x: string]: string;
}

export interface Payload {
  data?: FormData;
  error?: unknown;
}
export interface Action {
  type: string;
  payload: Payload;
}

export interface InitialState {
  loading: boolean;
  error: unknown;
  data?: FormData;
}
