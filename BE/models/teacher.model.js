import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    //Mã định danh giáo viên. (10 chữ số, ngẫu nhiên, unique)
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    teacherPositionsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeacherPosition",
    },
    degrees: [
      {
        type: {
          type: String,
          required: true,
          trim: true,
        },
        school: {
          type: String,
          required: true,
          trim: true,
        },
        major: {
          type: String,
          trim: true,
        },
        year: {
          type: Number,
        },
        isGraduated: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const teacherModel = mongoose.model("Teacher", teacherSchema);
export default teacherModel;
