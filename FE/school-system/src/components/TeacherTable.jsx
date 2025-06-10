import React from "react";

const TeacherTable = ({ teachers, onEdit, onAdd }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teacher
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Degree
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Example data, replace with actual data */}
          {teachers.map((teacher) => (
            <tr
              key={teacher._id}
              className="hover:bg-gray-50 cursor-pointer border-b border-gray-200"
              onClick={() => onEdit(teacher._id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{teacher.code}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {teacher.userId?.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {teacher.userId?.email}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {teacher.userId?.phoneNumber}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {teacher.degrees?.[teacher.degrees.length - 1].type}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    {teacher.degrees?.[teacher.degrees.length - 1].school}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {teacher.userId?.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
