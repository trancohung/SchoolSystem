import userModel from "../models/user.model.js";

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
