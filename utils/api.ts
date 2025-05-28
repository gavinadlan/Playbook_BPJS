export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(url, {
    ...options,
    headers,
  });
};
