export enum Status {
  Ok,
  Error,
}

export interface OkData {
  status: Status.Ok;
}

export interface ErroneousData {
  status: Status.Error;
  error: Error;
}

export type DataWithStatus<T> = (OkData & T) | ErroneousData;
