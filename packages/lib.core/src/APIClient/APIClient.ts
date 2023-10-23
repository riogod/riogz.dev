import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import type { IRequestOption } from "./interfaces";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export class APIClient {
  private api: AxiosInstance;
  private errorCb = new Map<string, (error: AxiosError) => void>();

  constructor(private baseURL: string) {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      withCredentials: true,
    });
  }

  public addErrorCb(id: string, cb: (error: AxiosError) => void): void {
    this.errorCb.set(id, cb);
  }

  public async genearateDeviceId(): Promise<string> {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }
  public async request<Req, Resp>(option: IRequestOption<Req>): Promise<Resp> {
    const DeviceUUID = localStorage.getItem("D_UUID");
    const requestConfig: AxiosRequestConfig<Req> = {
      responseType: "json",
      method: option.method,
      url: option.route,
      headers: {
        "Device-Id": DeviceUUID,
        ...option.headers,
      },
    };

    if (option.requestObj) {
      requestConfig.data = option.requestObj;
    }
    try {
      const response = await this.api.request<Resp>(requestConfig);

      return response.data;
    } catch (error: unknown | AxiosError) {
      if (
        axios.isAxiosError(error) &&
        error.code &&
        this.errorCb.has(error.code)
      ) {
        const cb = this.errorCb.get(error.code);
        if (cb) {
          cb(error as AxiosError);
        }
      }
      return Promise.reject<Resp>(error);
    }
  }
}
