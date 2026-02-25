"use client";

import { useEffect, useState } from "react";
import { apiInstance } from "./axios/apiInstance";
import DataTable from "react-data-table-component";

export default function UserFormPage() {
  const [userData, setUserData] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [list, setList] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    setRecords(list);
  }, [list]);

  function handleChange(e) {
    const { value, name } = e.target;
    let newHobbies = [...hobbies];

    if (name === "hobbies") {
      if (e.target.checked) {
        if (!hobbies.includes(value)) {
          newHobbies = [...hobbies, value];
        } else {
          newHobbies = hobbies;
        }
      } else {
        newHobbies = hobbies.filter((hobby) => hobby !== value);
      }
      setHobbies(newHobbies);
    }

    setUserData((prev) => ({
      ...prev,
      [name]: value,
      hobbies: newHobbies,
    }));
  }

  function handleSearch(e) {
    let query = e.target.value;
    if (!query) {
      setRecords(list);
      return;
    }
    let newRecord = list.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase()),
    );
    setRecords(newRecord);
  }

  async function handleGetData() {
    try {
      let res = await apiInstance.get("/api/users");
      setList(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handlePost(e) {
    e.preventDefault();
    if (!handleValidation(userData)) return;
    try {
      if (userData._id) {
        // Update existing user
        await apiInstance.patch(`/api/users/${userData._id}`, userData);
      } else {
        // Create new user
        await apiInstance.post("/api/users", userData);
      }
      handleGetData();
    } catch (error) {
      throw new Error(error.message || "unable to send post message");
    }
    setHobbies([]);
    setUserData({});
  }

  async function handleEdit(user) {
    setUserData(user);
    setHobbies(user.hobbies || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setUserData({});
    setHobbies([]);
    setError({});
  }

  async function handleDelete(id) {
    try {
      await apiInstance.delete(`/api/users/${id}`);
      handleGetData();
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleValidation(data) {
    let err = {};
    if (!data.username) err.username = `Required Username`;
    if (!data.email) err.email = `Required Email`;
    if (!data.password) err.password = `Required Password`;
    if (!data.gender) err.gender = `Required Gender`;
    if (!data.phoneNumber) err.phoneNumber = `Required Phone Number`;
    if (!data.address) err.address = `Required Address`;
    if (hobbies.length === 0) err.hobbies = `Required Hobbies`;
    setError(err);
    console.log(err);

    return Object.keys(err).length === 0;
  }
  console.log("error", error);
  console.log(userData);

  const columns = [
    {
      name: "Sr.No",
      cell: (row, index) => (
        <div className="font-semibold text-slate-100">{index + 1}</div>
      ),
      width: "60px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      cell: (row) => (
        <div className="font-semibold text-blue-400">{row.username}</div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <div className="text-slate-300">{row.email}</div>,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 capitalize">
            {row.gender}
          </span>
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phoneNumber,
      cell: (row) => <div className="text-slate-300">{row.phoneNumber}</div>,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (row) => (
        <div className="text-slate-300 max-w-xs truncate">{row.address}</div>
      ),
    },
    {
      name: "Hobbies",
      selector: (row) => row.hobbies.join(", "),
      cell: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300"
            >
              {hobby}
            </span>
          ))}
        </div>
      ),
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            title="Edit user"
            className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row._id)}
            title="Delete user"
            className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Delete
          </button>
        </div>
      ),
      width: "160px",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/40">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              User Form
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50">
              {userData._id ? "Edit User Profile" : "Create a User Profile"}
            </h1>
          </div>

          <form className="grid gap-6" method="post" onSubmit={handlePost}>
            <div className="grid gap-2">
              <label className="text-sm text-slate-300" htmlFor="username">
                Username
              </label>
              <input
                onChange={handleChange}
                className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                id="username"
                name="username"
                value={userData.username || ""}
                placeholder="e.g. skywalker"
              />
              {error.username && (
                <span className="text-sm text-red-700">{error.username}</span>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-slate-300" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChange}
                className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                id="email"
                name="email"
                value={userData.email || ""}
                placeholder="name@example.com"
                type="email"
              />
              {error.email && (
                <span className="text-sm text-red-700">{error.email}</span>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={userData.password || ""}
              />
              {error.password && (
                <span className="text-sm text-red-700">{error.password}</span>
              )}
            </div>

            <div className="grid gap-2">
              <p className="text-sm text-slate-300">Gender</p>
              <div className="flex flex-wrap gap-4">
                <label
                  className="flex items-center gap-2 text-slate-200"
                  htmlFor="gender-female"
                >
                  <input
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-slate-500"
                    id="gender-female"
                    name="gender"
                    type="radio"
                    value={"female"}
                    checked={userData.gender === "female"}
                  />
                  Female
                </label>
                <label
                  className="flex items-center gap-2 text-slate-200"
                  htmlFor="gender-male"
                >
                  <input
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-slate-500"
                    id="gender-male"
                    name="gender"
                    type="radio"
                    value={"male"}
                    checked={userData.gender === "male"}
                  />
                  Male
                </label>
              </div>
              {error.gender && (
                <span className="text-sm text-red-700">{error.gender}</span>
              )}
            </div>

            <div className="grid gap-2">
              <p className="text-sm text-slate-300">Hobbies</p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    className="h-4 w-4 cursor-pointer rounded border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-slate-500"
                    name="hobbies"
                    type="checkbox"
                    value="photography"
                    checked={hobbies.includes("photography")}
                    onChange={handleChange}
                  />
                  Photography
                </label>
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    className="h-4 w-4 cursor-pointer rounded border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-slate-500"
                    name="hobbies"
                    type="checkbox"
                    value="hiking"
                    checked={hobbies.includes("hiking")}
                    onChange={handleChange}
                  />
                  Hiking
                </label>
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    className="h-4 w-4 cursor-pointer rounded border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-slate-500"
                    name="hobbies"
                    type="checkbox"
                    value="chess"
                    checked={hobbies.includes("chess")}
                    onChange={handleChange}
                  />
                  Chess
                </label>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-slate-300" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                onChange={handleChange}
                className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+91 7016339228"
                type="tel"
                value={userData.phoneNumber || ""}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-slate-300" htmlFor="address">
                Address
              </label>
              <textarea
                value={userData.address || ""}
                onChange={handleChange}
                className="min-h-30 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                id="address"
                name="address"
                placeholder="Street, city, state, zip"
              />
              {error.hobbies && (
                <span className="text-sm text-red-700">{error.hobbies}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white cursor-pointer"
                type="submit"
              >
                {userData._id ? "Update User" : "Save User"}
              </button>
              {userData._id && (
                <button
                  onClick={handleCancel}
                  className="rounded-full bg-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-600 cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-8xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/40">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Users
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50">
              User List
            </h1>
          </div>
          <div className="mb-4">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search users..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <DataTable
              columns={columns}
              data={records}
              pagination
              paginationPerPage={8}
              paginationRowsPerPageOptions={[8, 15, 20, 25]}
              highlightOnHover
              pointerOnHover
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#1e293b",
                    borderBottomColor: "#475569",
                    borderBottomWidth: "2px",
                  },
                },
                headCells: {
                  style: {
                    color: "#cbd5e1",
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                },
                rows: {
                  style: {
                    backgroundColor: "#0f172a",
                    borderBottomColor: "#334155",
                    minHeight: "55px",
                    transition: "all 0.3s ease",
                  },
                  highlightOnHoverStyle: {
                    backgroundColor: "#1e293b",
                    borderBottomColor: "#475569",
                    borderLeftColor: "#3b82f6",
                    borderLeftWidth: "4px",
                    paddingLeft: "12px",
                    boxShadow: "inset 0 0 8px rgba(59, 130, 246, 0.1)",
                    cursor: "pointer",
                  },
                },
                cells: {
                  style: {
                    color: "#e2e8f0",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontSize: "14px",
                  },
                },
                pagination: {
                  style: {
                    backgroundColor: "#0f172a",
                    color: "#cbd5e1",
                    borderTopColor: "#334155",
                    minHeight: "55px",
                  },
                  pageButtonsStyle: {
                    backgroundColor: "#1e293b",
                    borderColor: "#475569",
                    color: "#cbd5e1",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#334155",
                      borderColor: "#64748b",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      backgroundColor: "#0f172a",
                      color: "#64748b",
                    },
                    "&:active": {
                      backgroundColor: "#475569",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
