import baseUrl from '../Api/baseURL';

const useInsertDataWithImage = async (url, params) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await baseUrl.post(url, params, config);

    return res;
  } catch (err) {
    throw err.response;
  }
};

const useInsertData = async (url, params) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const res = await baseUrl.post(url, params, config);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export {useInsertDataWithImage, useInsertData};
