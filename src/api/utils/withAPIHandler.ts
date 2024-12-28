import { FetchBuilder } from "./FetchBuilder";

export function withAPIHandler<T>(
  fetchBuilder: FetchBuilder,
  handler: (response: any, ...args: any[]) => T
) {
  return async function (...args: any[]): Promise<T> {
    const fetchConfig = fetchBuilder.build();

    try {
      console.log(`Fetching from: ${fetchConfig.url}`);
      const response = await fetch(fetchConfig.url, fetchConfig.options);

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return handler(data, ...args);
    } catch (error) {
      console.error(`Error during fetch for ${fetchConfig.url}:`, error);
      throw error;
    }
  };
}
