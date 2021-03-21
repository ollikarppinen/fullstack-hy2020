import axios from "axios";

const crudResourceService = function() {
  const setBaseUrl = (baseUrl) => {
    this.baseUrl = baseUrl;
  };

  const setToken = (token) => {
    this.token = `bearer ${token}`;
  };

  const create = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.post(this.baseUrl, object, config);
    return response.data;
  };

  const put = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.put(
      `${this.baseUrl}/${object.id}`,
      object,
      config
    );
    return response.data;
  };

  const remove = async (object) => {
    const config = {
      headers: { Authorization: this.token },
    };

    const response = await axios.delete(`${this.baseUrl}/${object.id}`, config);
    return response.data;
  };

  const getAll = () => {
    const request = axios.get(this.baseUrl);
    return request.then((response) => response.data);
  };

  return { getAll, setBaseUrl, create, setToken, put, remove };
}.bind({})();

export default crudResourceService;
