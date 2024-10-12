import { AxiosError } from "axios";

export interface ResponseServiceDetails {
  eventCode: number;
  message: string;
  counter?: number;
  link?: string;
}

export interface ResponseServiceMetaError {
  eventCode?: number;
  message?: string;
  subMessage?: string;
}

export interface MetaInformation {
  source: string;
  lastUpdate: string;
}

export interface ResponseService<T> {
  message: string;
  data: T;
  error?: string;
}

export interface ResponseDataList<T> {
  results: Array<T>
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  total_pages: number
  total_results: number
}

export type AxiosErrorResponse = AxiosError<ResponseService<unknown>>;

export interface ParamsDataPagination {
  page: number;
}
