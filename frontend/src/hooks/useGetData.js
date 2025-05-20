import baseUrl from '../Api/baseURL';

const useGetData = async (url, params) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};

// const useGetDataCurrentUserToken = async (url) => {
//   const config = {
//     headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
//   };
//   const res = await baseUrl.get(url, config);
//   return res.data;
// };

export default useGetData;
