import React, { useEffect, useState } from "react";

const TeacherForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.userId?.name || "",
        phone: initialData.userId?.phoneNumber || "",
        email: initialData.userId?.email || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", phoneNumber: "" });
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Teacher" : "Add New Teacher"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Enter teacher's name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Enter teacher's email"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {initialData ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
