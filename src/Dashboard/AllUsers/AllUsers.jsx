import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // Update user status (block/unblock)
  const handleStatusChange = async (email, status) => {
    try {
      const res = await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${status}`
      );
      if (res.data?.modifiedCount > 0) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // 🔹 NEW: Update user role (donor → volunteer / admin)
  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosSecure.patch("/users/role", { email, newRole });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Role update failed:", err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Role</th>
            <th>User Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>

              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user?.photoURL || "https://via.placeholder.com/48"}
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user?.name}</div>
                    <div className="text-sm opacity-50">{user?.email}</div>
                  </div>
                </div>
              </td>

              <td>{user?.role}</td>
              <td>{user?.status}</td>

              <td>
                <div className="flex flex-wrap gap-1">
                  {/* Block / Unblock */}
                  {user?.status !== "active" ? (
                    <button
                      onClick={() => handleStatusChange(user.email, "active")}
                      className="btn btn-ghost btn-xs"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user.email, "blocked")}
                      className="btn btn-error btn-xs"
                    >
                      Block
                    </button>
                  )}

                  {/* Make Volunteer — only for donors */}
                  {user?.role === "donor" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "volunteer")}
                      className="btn btn-warning btn-xs"
                    >
                      Make Volunteer
                    </button>
                  )}

                  {/* Make Admin — for donor or volunteer */}
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "admin")}
                      className="btn btn-error btn-xs"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;