import teacherModel from "../models/teacher.model.js";

export const generateId = async () => {
  let isUnique = false;
  let code = "";
  while (!isUnique) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const exist = await teacherModel.findOne({ code });
    if (!exist) isUnique = true;
  }
  return code;
};
