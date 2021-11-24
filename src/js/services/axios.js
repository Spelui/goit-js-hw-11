import axios from 'axios';
import pageOption from './page_option';

// Your API key: 24484342-5d490b786e593542a839fc86b

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24484342-5d490b786e593542a839fc86b';

axios.defaults.baseURL = BASE_URL;

const getImage = async value => {
  const queryOptions = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: pageOption.maxImg,
    page: pageOption.page,
  });

  // return axios.get('?' + queryOptions.toString()).then(resolve => resolve.data);

  const { data } = await axios.get('?' + queryOptions.toString());
  return data;
};

export default getImage;
