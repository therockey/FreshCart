export class FetchBuilder {
  private url: string;
  private options: RequestInit = {};

  constructor(url: string) {
    this.url = url;
  }

  setMethod(method: string): FetchBuilder {
    this.options.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>): FetchBuilder {
    this.options.headers = headers;
    return this;
  }

  setBody(body: any): FetchBuilder {
    this.options.body = JSON.stringify(body);
    return this;
  }

  build(): { url: string; options: RequestInit } {
    return { url: this.url, options: this.options };
  }
}
