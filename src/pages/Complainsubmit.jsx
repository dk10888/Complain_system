import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function ComplaintsSubmit() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    subject: "",
    issue: "",
  });
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/complaints", formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setComplaints([...complaints, res.data]);
      setFormData({ date: new Date().toISOString().split("T")[0], subject: "", issue: "" });
    } catch (err) {
      console.error("Error submitting complaint:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📝 Submit a Complaint</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter complaint subject" className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Issue Details</label>
              <textarea name="issue" value={formData.issue} onChange={handleChange} placeholder="Describe your issue in detail..." rows="5" className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold">Submit Complaint</button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📜 Complaint History</h2>
          {complaints.length === 0 ? (
            <p className="text-gray-500">No complaints submitted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Sr No.</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Subject</th>
                    <th className="px-4 py-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c, index) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{c.date}</td>
                      <td className="px-4 py-2 border">{c.subject}</td>
                      <td className="px-4 py-2 border">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          c.status === "Submitted" ? "bg-yellow-100 text-yellow-800" :
                          c.status === "in process" ? "bg-blue-100 text-blue-800" :
                          "bg-green-100 text-green-800"
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComplaintsSubmit;
