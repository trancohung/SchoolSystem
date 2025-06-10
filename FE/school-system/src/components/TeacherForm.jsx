import React, { useEffect, useState } from "react";
import teacherPositionApi from "../services/teacherPositionApi.js";
import teacherApi from "../services/teacherApi.js";

const TeacherForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    identity: "",
    address: "",
    dob: "",
    phoneNumber: "",
    teacherPositionsId: "",
    email: "",
  });

  const [degrees, setDegrees] = useState([
    { type: "", school: "", major: "", year: "", isGraduated: false },
  ]);

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await teacherPositionApi.getAll();
        setPositions(res.data || []);
      } catch (err) {
        console.error("Error fetching positions", err);
      }
    };
    fetchPositions();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.userId?.name || "",
        phoneNumber: initialData.userId?.phoneNumber || "",
        email: initialData.userId?.email || "",
        identity: initialData.userId?.identity || "",
        dob: initialData.userId?.dob?.split("T")[0] || "",
        teacherPositionsId: initialData.teacherPositionsId?._id || "",
        address: initialData.userId?.address || "",
      });

      setDegrees(
        initialData.degrees?.length
          ? initialData.degrees.map((deg) => ({
              type: deg.type || "",
              school: deg.school || "",
              major: deg.major || "",
              year: deg.year || "",
              isGraduated: deg.isGraduated || false,
            }))
          : [{ type: "", school: "", major: "", year: "", isGraduated: false }]
      );
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDegreeChange = (index, field, value) => {
    const updated = [...degrees];
    updated[index][field] = field === "isGraduated" ? value === "true" : value;
    setDegrees(updated);
  };

  const handleAddDegree = () => {
    setDegrees([
      ...degrees,
      { type: "", school: "", major: "", year: "", isGraduated: false },
    ]);
  };

  const handleRemoveDegree = (index) => {
    const updated = degrees.filter((_, i) => i !== index);
    setDegrees(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      name: form.name,
      identity: form.identity,
      address: form.address,
      dob: form.dob,
      phoneNumber: form.phoneNumber,
      email: form.email,
      teacherPositionsId: form.teacherPositionsId,
      degrees: degrees.map((d) => ({
        ...d,
        year: d.year ? parseInt(d.year) : undefined,
      })),
    };

    if (initialData?._id) {
      teacherApi.update(initialData._id, submitData).then(() => {
        onSubmit();
      });
    } else {
      teacherApi.create(submitData).then(() => {
        onSubmit();
      });
    }

    setForm({
      name: "",
      identity: "",
      address: "",
      dob: "",
      phoneNumber: "",
      teacherPositionsId: "",
      email: "",
    });

    setDegrees([
      { type: "", school: "", major: "", year: "", isGraduated: false },
    ]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Teacher" : "Add New Teacher"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Identity</label>
          <input
            type="text"
            name="identity"
            value={form.identity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-semibold mb-2">Degrees</label>
          {degrees.map((deg, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-2 items-center mb-2"
            >
              <input
                type="text"
                placeholder="Type"
                value={deg.type}
                onChange={(e) =>
                  handleDegreeChange(index, "type", e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="School"
                value={deg.school}
                onChange={(e) =>
                  handleDegreeChange(index, "school", e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="Major"
                value={deg.major}
                onChange={(e) =>
                  handleDegreeChange(index, "major", e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Year"
                value={deg.year}
                onChange={(e) =>
                  handleDegreeChange(index, "year", e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <select
                value={deg.isGraduated}
                onChange={(e) =>
                  handleDegreeChange(index, "isGraduated", e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                <option value={true}>Graduated</option>
                <option value={false}>Not Graduated</option>
              </select>
              {degrees.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDegree(index)}
                  className="text-red-600 ml-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDegree}
            className="mt-2 text-blue-600 cursor-pointer"
          >
            + Add Degree
          </button>
        </div>

        <div>
          <label className="block mb-1">Position</label>
          <select
            name="teacherPositionsId"
            value={form.teacherPositionsId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Position --</option>
            {positions.map((pos) => (
              <option key={pos._id} value={pos._id}>
                {pos.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {initialData ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
