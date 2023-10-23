import type { AxiosError } from "axios";
import type { IRequestOption } from "./interfaces";
export declare class APIClient {
    private baseURL;
    private api;
    private errorCb;
    constructor(baseURL: string);
    addErrorCb(id: string, cb: (error: AxiosError) => void): void;
    genearateDeviceId(): Promise<string>;
    request<Req, Resp>(option: IRequestOption<Req>): Promise<Resp>;
}
//# sourceMappingURL=APIClient.d.ts.map