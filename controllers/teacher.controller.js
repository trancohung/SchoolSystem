import teacherModel from "../models/teacher.model.js";

const teacherController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const teachers = await teacherModel
        .find(
          {},
          {
            code: 1,
            userId: 1,
            teacherPositionsId: 1,
            "degrees.type": 1,
            "degrees.school": 1,
          }
        )
        .populate({ path: "userId", select: "name email phone" })
        .populate({ path: "teacherPositionsId", select: "name" })
        .skip(skip)
        .limit(limit)
        .exec();
      const totalCount = await teacherModel.countDocuments({});
      res.status(200).json({
        data: teachers,
        pagination: {
          totalCount: totalCount,
          currentPage: page,
          limit: limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default teacherController;
