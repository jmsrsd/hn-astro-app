import { fetchJson } from "./fetch";

export const api = {
  url: function (name: string) {
    return `https://hacker-news.firebaseio.com/v0/${name}.json?print=pretty`;
  },
  fetch: async function (name: string) {
    return await fetchJson(api.url(name));
  },
  item: async function (id: number) {
    const json = await api.fetch(`item/${id}`);

    const item = JSON.parse(JSON.stringify(json));

    const kids = !item.kids
      ? item.kids
      : await Promise.all(
          item.kids.map((kid: any) => {
            return (async function () {
              try {
                return await api.item(kid);
              } catch (e) {
                return {
                  id: kid,
                  error: `${e}`,
                };
              }
            })();
          }),
        );

    item.kids = kids;

    return item;
  },
};
