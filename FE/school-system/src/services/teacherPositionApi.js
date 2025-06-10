import axios from "axios";

const API = "http://localhost:3000/api/v1/teacher-positions";

const teacherPositionApi = {
  getAll: () => axios.get(API),
};

export default teacherPositionApi;
