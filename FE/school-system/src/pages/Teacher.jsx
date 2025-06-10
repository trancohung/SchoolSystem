import React, { useEffect, useState } from "react";
import TeacherTable from "../components/TeacherTable";
import teacherApi from "../services/teacherApi";
import TeacherForm from "../components/TeacherForm";

const Teacher = () => {
  // this page will manage the teacher's information
  const [teachers, setTeachers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
  });
  const [editTeacher, setEditTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTeachers = async (page = 1) => {
    try {
      const res = await teacherApi.getAll(page);
      setTeachers(res.data);
      setPagination(res.pagination);
      console.log("Teachers fetched successfully:", res.data);
      console.log("Teachers fetched successfully:", res.pagination);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = () => {
    setEditTeacher(null);
    setShowForm(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editTeacher) {
        await teacherApi.update(editTeacher._id, formData);
        console.log("Teacher updated successfully!");
      } else {
        await teacherApi.create(formData);
        console.log("Teacher added successfully!");
      }
      setShowForm(false);
      setEditTeacher(null);
      fetchTeachers();
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditTeacher(null);
  };

  return (
    <div className=" bg-gray-200 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Teacher List</h2>
          {!showForm && (
            <button
              className="cursor-pointer mb-4 bg-gray-600 text-white p-2 rounded-lg"
              onClick={handleAddTeacher}
            >
              Add
            </button>
          )}
        </div>
        {/* Teacher list will be displayed here */}
        {!showForm && (
          <TeacherTable
            teachers={teachers}
            onEdit={handleEditTeacher}
            onAdd={handleAddTeacher}
          />
        )}
        {showForm && (
          <TeacherForm
            initialData={editTeacher}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
          />
        )}
        <div className="flex justify-end items-center mt-4 gap-4">
          <div>Total: {pagination.totalCount}</div>
          <div className="flex gap-2">
            <button
              className="cursor-pointer"
              onClick={() => fetchTeachers(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              ‹
            </button>
            <div>
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-2 cursor-pointer ${
                    pagination.currentPage === index + 1 ? "font-bold" : ""
                  }`}
                  onClick={() => fetchTeachers(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="cursor-pointer"
              onClick={() => fetchTeachers(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              ›
            </button>
            <span>
              Page {pagination.currentPage} / {pagination.totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
