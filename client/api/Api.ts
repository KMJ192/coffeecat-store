import { Api } from './types';

const api: Api = (function () {
  let globalURL = '';

  async function useRequest(
    url: string,
    option: { [key: string]: any } = {},
  ): Promise<any> {
    const requestUrl = globalURL ? `${globalURL}${url}` : url;
    try {
      const response = await fetch(requestUrl, option);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`http request error : ${response.status}`);
    } catch (e) {
      console.warn(`http request error : ${e}`);
      return null;
    }
  }

  function useGlobalUrl(url: string) {
    globalURL = url;
  }

  return {
    useRequest,
    useGlobalUrl,
  };
})();

export const { useRequest, useGlobalUrl } = api;
export default api;
