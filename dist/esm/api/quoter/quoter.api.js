import { Quote } from './quote';
import { concatQueryParams } from '../params';
export class QuoterApi {
    config;
    httpClient;
    static Version = 'v1.0';
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
    }
    async getQuote(params) {
        const queryParams = concatQueryParams(params.build());
        const url = `${this.config.url}/${QuoterApi.Version}/quote/receive/${queryParams}`;
        const res = await this.httpClient.get(url);
        return new Quote(params, res);
    }
    async getQuoteWithCustomPreset(params, body) {
        const bodyErr = body.validate();
        if (bodyErr) {
            throw new Error(bodyErr);
        }
        const queryParams = concatQueryParams(params.build());
        const bodyParams = body.build();
        const url = `${this.config.url}/${QuoterApi.Version}/quote/receive/${queryParams}`;
        const res = await this.httpClient.post(url, bodyParams);
        return new Quote(params, res);
    }
}
//# sourceMappingURL=quoter.api.js.map