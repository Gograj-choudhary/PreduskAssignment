import { NavLink } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
import { LoginAdmin } from "../../services/AdminServices";

export const AdminLogin = () => {
  const { mutate, isPending, isError, error } = useAdmin(LoginAdmin);

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Admin Data", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("Admin Data", response);
        localStorage.setItem("accessToken", response.accessToken);
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#FFFDD0] shadow-md rounded-xl p-8 ">
        <h1 className="text-3xl font-bold mb-8 text-center"> Admin Login </h1>

        <form onSubmit={handleLoginAdmin} className="space-y-6">

          
          <div>
            <label className="block text-sm font-medium mb-1">Phone:</label>
            <input
              type="Number"
              name="phone"
              required
              placeholder="For Testing Use - 9887581781"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              name="password"
              required
              placeholder="For Testing Use - gograj@123"
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
              {isPending ? "Logining..." : "Login"}
            </button>
          </div>

          <p className="text-center mt-4">
            Don't have an account?
            <NavLink
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
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
