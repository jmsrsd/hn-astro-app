import { fetchJson } from "./fetch";

export const of = function (origin: string) {
  return {
    get: async function (endpoint: string, params?: any) {
      const url = new URL(`${origin}/api/${endpoint}`);

      for (const key of Object.keys(params ?? {})) {
        url.searchParams.set(key, `${(params ?? {})[key]}`);
      }

      return await fetchJson(`${url}`);
    },
  };
};
