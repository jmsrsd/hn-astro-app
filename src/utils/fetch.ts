export const fetchJson = async function (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  return await fetch(input, init).then(async (response) => {
    return await response.json();
  });
};
