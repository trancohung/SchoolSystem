import teacherPositionModel from "../models/teacherPosition.model.js";

const teacherPositionController = {
  getAll: async (req, res) => {
    try {
      const teacherPositions = await teacherPositionModel.find({});
      res.status(200).json(teacherPositions);
    } catch (error) {
      console.error("Error fetching teacher positions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default teacherPositionController;
