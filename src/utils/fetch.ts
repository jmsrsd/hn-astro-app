export const fetchJson = async function (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  return await fetch(input, init).then(async (response) => {
    return await response.json();
  });
};

export const fetchItemById = async function (id: number) {
  const json = await fetchJson(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
  );

  const item = JSON.parse(JSON.stringify(json));

  const kids = !item.kids
    ? item.kids
    : await Promise.all(
        item.kids.map((kid: any) => {
          return (async function () {
            try {
              return await fetchItemById(kid);
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
};
