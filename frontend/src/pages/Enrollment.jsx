import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Enrollment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    childName: "",
    birthday: "",
    parentName: "",
    parentContact: "",
    parentEmail: "",
    parentRelationship: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.childName) newErrors.childName = "Child's name is required";
    if (!form.birthday) newErrors.birthday = "Birthday is required";
    if (!form.parentName) newErrors.parentName = "Parent's name is required";
    if (!form.parentContact) newErrors.parentContact = "Contact number is required";
    if (!form.parentEmail) newErrors.parentEmail = "Email is required";
    if (!form.parentRelationship) newErrors.parentRelationship = "Relationship is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/enroll", {
        parent_name: form.parentName,
        parent_email: form.parentEmail,
        parent_contact: form.parentContact,
        parent_relationship: form.parentRelationship,
        child_name: form.childName,
        child_birthday: form.birthday,
      });

      if (res.data.success) {
        setForm({
          childName: "",
          birthday: "",
          parentName: "",
          parentContact: "",
          parentEmail: "",
          parentRelationship: "",
        });
        setShowSuccessModal(true);
      }

    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-blue-900 font-semibold hover:text-blue-700 transition"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center mt-4">
          Enrollment Form
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Child Name */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Name of Child</label>
            <input
              type="text"
              name="childName"
              value={form.childName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-sky-200 rounded-lg px-4 py-3"
            />
            {errors.childName && <p className="text-red-500 text-sm mt-1">{errors.childName}</p>}
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full border border-sky-200 rounded-lg px-4 py-3"
            />
            {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Parent Name</label>
            <input
              type="text"
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full border border-sky-200 rounded-lg px-4 py-3"
            />
            {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
          </div>

          {/* Parent Contact */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Parent Contact</label>
            <input
              type="tel"
              name="parentContact"
              value={form.parentContact}
              onChange={handleChange}
              placeholder="09123456789"
              className="w-full border border-sky-200 rounded-lg px-4 py-3"
            />
            {errors.parentContact && <p className="text-red-500 text-sm mt-1">{errors.parentContact}</p>}
          </div>

          {/* Parent Email */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Parent Email</label>
            <input
              type="email"
              name="parentEmail"
              value={form.parentEmail}
              onChange={handleChange}
              placeholder="parent@example.com"
              className="w-full border border-sky-200 rounded-lg px-4 py-3"
            />
            {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
          </div>

          {/* Parent Relationship */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Relationship</label>
            <select
              name="parentRelationship"
              value={form.parentRelationship}
              onChange={handleChange}
              className="w-full border border-sky-200 rounded-lg px-4 py-3 bg-white"
            >
              <option value="">Select Relationship</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Guardian">Guardian</option>
            </select>
            {errors.parentRelationship && (
              <p className="text-red-500 text-sm mt-1">{errors.parentRelationship}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-900 text-white py-3 rounded-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Enrollment"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

          {/* Modal box */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-blue-900 z-10">
            <h2 className="text-xl font-bold text-blue-900 mb-3">Success!</h2>
            <p className="text-sky-700 mb-6">Enrollment submitted successfully.</p>
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

export default Enrollment;
