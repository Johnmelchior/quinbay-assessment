import axios from 'axios';

export const call = (json) => {
  return axios.get(`/service/blibliserver/backend/search/products?searchTerm=${json.searchTerm}&start=${json.page}&itemPerPage=${json.itemPerPage}`, {
    withCredentials: true
  });
}