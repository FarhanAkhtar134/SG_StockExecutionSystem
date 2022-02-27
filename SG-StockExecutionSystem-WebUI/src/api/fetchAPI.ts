export const fetchAPI = (url: string, fetchData: FetchData | {}) =>
  fetch(url, fetchData)
    .then(async (response) => {
      const body = await response.json();
      const status = response.status;
      return { body: body, status: status };
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
