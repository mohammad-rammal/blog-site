import baseUrl from '../Api/baseURL';

const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const res = await baseUrl.put(url, params, config);
  console.log(res);

  return res;
};

const useUpdateData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await baseUrl.put(url, params, config);
  console.log(res);

  return res;
};

const useInUpdateData = async (url, params) => {
  const res = await baseUrl.put(url, params);
  console.log(res);

  return res;
};

export {useUpdateDataWithImage, useUpdateData, useInUpdateData};
