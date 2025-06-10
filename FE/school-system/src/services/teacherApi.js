import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/teachers";

const teacherApi = {
  getAll: async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${page}&limit=${limit}`
      );
      if (response.status !== 200) {
        throw new Error(`Error fetching teachers: ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },
  create: async (data) => {
    try {
      const response = await axios.post(API_BASE_URL, data);
      return response.data;
    } catch (error) {
      console.error("Error creating teachers:", error);
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating teacher:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
export default teacherApi;
