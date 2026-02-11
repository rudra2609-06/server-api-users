"use client";

import { useEffect, useState } from "react";
import { apiInstance } from "./axios/apiInstance";
import DataTable from "react-data-table-component";

export default function UserFormPage() {
  const [userData, setUserData] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [list, setList] = useState([]);
  const [records, setRecords] = useState([]);
  
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
  console.log(list);
  console.log(records);
  

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
    try {
      let res = await apiInstance.post("/api/users", userData);
      handleGetData();
    } catch (error) {
      throw new Error(error.message || "unable to send post message");
    }
    setHobbies([]);
    setUserData({});
  }

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "black",
        color: "white",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  };

  const columns = [
    {
      name: "Sr.No",
      cell: (row, index) => index + 1,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Hobbies",
      selector: (row) => row.hobbies.join(", "),
      wrap : true,
    },
  ];

  // const data = list;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/40">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              User Form
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-50">
              Create a User Profile
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
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white cursor-pointer"
                type="submit"
              >
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-16">
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
            {/* <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Username</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Password</th>
                  <th className="px-4 py-3 font-medium">Gender</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                  <th className="px-4 py-3 font-medium">Phone Number</th>
                  <th className="px-4 py-3 font-medium">Hobbies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/50 text-slate-200">
                {list.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-slate-400" colSpan={3}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  // list.map((user, index) => {
                  //   return (
                  //     <tr key={user._id}>
                  //       <td className="px-4 py-4">{index + 1}</td>
                  //       <td className="px-4 py-4">{user.username}</td>
                  //       <td className="px-4 py-4">{user.email}</td>
                  //       <td className="px-4 py-4">{user.password}</td>
                  //       <td className="px-4 py-4">{user.gender}</td>
                  //       <td className="px-4 py-4">{user.address}</td>
                  //       <td className="px-4 py-4">{user.phoneNumber}</td>
                  //       <td className="px-4 py-4">{user.hobbies}</td>
                  //     </tr>
                  //   );
                  // })
                )}
              </tbody>
            </table> */}
            <DataTable
              columns={columns}
              data={records}
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>
      </div>
    </main>
  );
}
