import { NavLink } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
import { AdminRegistration } from "../../services/AdminServices";

export const AdminRegister = () => {
  const { mutate, isPending, isError, error } = useAdmin(AdminRegistration);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Admin Data (form input)", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("Admin Registered Successfully:", response);
        window.location.href = "/login"; 
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#FFFDD0] shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Registration
        </h1>

        <form onSubmit={handleAddAdmin} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Eg. Gograj Dadarwal"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone:</label>
            <input
              type="number" 
              name="phone"
              pattern="[0-9]{10}" 
              required
              placeholder="Eg. 9876543210"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Eg. Gograj@123"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#1A1800] text-[#FFFDD0] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login link */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </NavLink>
          </p>

          {/* Error */}
          {isError && (
            <p className="text-red-600 text-center mt-4">
              {error?.response?.data?.message || "Something went wrong!"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
