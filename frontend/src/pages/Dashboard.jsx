import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import api from "../api";
import useAutoLogout from "../hooks/useAutoLogout";

const Dashboard = () => {
const navigate = useNavigate();
const [data, setData] = useState([]);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ modal state
const [successMessage, setSuccessMessage] = useState(""); // dynamic message
const [loadingStatus, setLoadingStatus] = useState({});

// Check login
useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
    navigate("/login", { replace: true });
    return;
    }
    setUser(JSON.parse(storedUser));
}, [navigate]);

// Fetch enrollment data
useEffect(() => {
    const fetchEnrollments = async () => {
    try {
        const res = await api.get("/students");
        const mapped = res.data.map((enroll) => ({
        childName: enroll.student_name,
        birthday: enroll.birthday,
        studentId: enroll.student_id,
        parentName: enroll.parent_name,
        parentContact: enroll.parent_contact,
        parentEmail: enroll.parent_email,
        relationship: enroll.parent_relationship,
        status: enroll.status || "Pending",
        enrollmentId: enroll.enrollment_id,
        }));
        setData(mapped);
    } catch (err) {
        console.error(err.response?.data || err.message);
    } finally {
        setLoading(false);
    }
    };
    fetchEnrollments();
}, []);

const handleLogout = async () => {
try {
    await api.post("/logout");
} catch (e) {}

localStorage.clear();
navigate("/login", { replace: true });
};

//auto logout after 5 minutes of inactivity
useAutoLogout(handleLogout, 5 * 60 * 1000);

// Update status with success modal
const updateStatus = async (index, newStatus) => {
    const enrollment = data[index];
    setLoadingStatus((prev) => ({ ...prev, [enrollment.enrollmentId]: true }));

    try {
        await api.patch(`/enrollments/${enrollment.enrollmentId}`, { status: newStatus });
        
        const updated = [...data];
        updated[index].status = newStatus;
        setData(updated);

        setSuccessMessage(`Status updated to ${newStatus} for ${enrollment.childName}`);
        setShowSuccessModal(true);

    } catch (err) {
        console.error(err.response?.data || err.message);
    } finally {
        setLoadingStatus((prev) => ({ ...prev, [enrollment.enrollmentId]: false }));
    }
};

const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollment Report");
    XLSX.writeFile(workbook, "Enrollment_Report.xlsx");
};

if (!user || loading) {
    return (
    <div className="min-h-screen flex items-center justify-center">
        Loading...
    </div>
    );
}

return (
    <div className="min-h-screen bg-white p-8 relative">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
        <div>
        <h1 className="text-3xl font-bold text-navy">Staff Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome, {user.name || "Staff"}</p>
        </div>

        <button
        onClick={handleLogout}
        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
        Logout
        </button>
    </div>

    {/* Export */}
    <div className="mb-4">
        <button
        onClick={exportToExcel}
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
        Export to Excel
        </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-900 text-white">
            <tr>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Child Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Birthday</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Student ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Parent Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Contact Number</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email Address</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Relationship</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
            <tr key={index} className="hover:bg-sky-100 transition-colors">
                <td className="px-6 py-4 text-sm text-navy">{item.childName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.birthday}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.studentId}</td>
                <td className="px-6 py-4 text-sm text-navy">{item.parentName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.parentContact}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.parentEmail}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.relationship}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${
                item.status === "Approved"
                    ? "text-green-600"
                    : item.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                {item.status}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                    {item.status !== "Approved" && (
                    <button
                        onClick={() => updateStatus(index, "Approved")}
                        disabled={loadingStatus[item.enrollmentId]}
                        className={`bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition ${
                        loadingStatus[item.enrollmentId] ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loadingStatus[item.enrollmentId] ? "Updating..." : "Approve"}
                    </button>
                    )}

                    {item.status !== "Rejected" && (
                    <button
                        onClick={() => updateStatus(index, "Rejected")}
                        disabled={loadingStatus[item.enrollmentId]}
                        className={`bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition ${
                        loadingStatus[item.enrollmentId] ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loadingStatus[item.enrollmentId] ? "Updating..." : "Reject"}
                    </button>
                    )}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>

    {/* Success Modal */}
    {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-blue-900 z-10">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Success!</h2>
            <p className="text-sky-700 mb-6">{successMessage}</p>
            <button
            onClick={() => setShowSuccessModal(false)}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-700 transition"
            >
            Close
            </button>
        </div>
        </div>
    )}
    </div>
);
};

export default Dashboard;
