const axios = require("axios").default;

class Api {
  constructor() {
    this.domain = "http://localhost:8000/api/";
  }

  async get(uri) {
    try {
      const response = await axios.get(this.domain + uri);

      return [response.status, response.data];
    } catch (error) {
      console.log(error);

      return [error.status, error.response];
    }
  }

  async post(uri, body) {
    try {
      const response = await axios.post(this.domain + uri, body, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });

      return response.status;
    } catch (error) {
      console.log(error);

      return error.status;
    }
  }
}

export default Api;
