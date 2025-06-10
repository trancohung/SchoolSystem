import teacherModel from "../models/teacher.model.js";

export const generateId = async () => {
  let isUnique = false;
  let code = "";
  while (!isUnique) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    const exist = await teacherModel.findOne({ code });
    if (!exist) isUnique = true;
  }
  return code;
};
