import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
console.log("at admin")
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/complaints/all", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/complaints/${id}`, { status }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const renderTable = (title, data) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sr No.</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Issue</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((c, i) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{c.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{c.issue}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{c.status}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  {c.status === "Submitted" && (
                    <button onClick={() => updateStatus(c._id, "in process")} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                      Mark In Process
                    </button>
                  )}
                  {c.status === "in process" && (
                    <button onClick={() => updateStatus(c._id, "resolved")} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">No complaints</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📋 Admin Complaint Panel</h1>
      {renderTable("🟢 New Complaints", complaints.filter(c => c.status === "Submitted"))}
      {renderTable("🟡 In Process Complaints", complaints.filter(c => c.status === "in process"))}
      {renderTable("✅ Resolved Complaints", complaints.filter(c => c.status === "resolved"))}
    </div>
  );
};

export default AdminPanel;
