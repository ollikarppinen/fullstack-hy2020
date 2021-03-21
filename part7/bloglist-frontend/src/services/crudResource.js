import axios from "axios";

const crudResourceService = function(baseUrl) {
  const setToken = (token) => {
    this.token = `bearer ${token}`;
  };

  const create = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.post(baseUrl, object, config);
    return response.data;
  };

  const put = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.put(`${baseUrl}/${object.id}`, object, config);
    return response.data;
  };

  const remove = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.delete(`${baseUrl}/${object.id}`, config);
    return response.data;
  };

  const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  };

  return { getAll, create, setToken, put, remove };
}.bind({});

export default crudResourceService;
