import { useUserStore } from "../stores/useUserStore";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const loadingUser = useUserStore((state) => state.loadingUser);

  if (loadingUser) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>User not found. Please log in again.</p>; // or redirect
  }

  return (
    <div className="flex items-center min-h-screen px-6">
      <div className="container mx-auto max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}!</h1>

        <section className="bg-[#fff4df] rounded shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Add more user info as needed */}
        </section>

        <section className="bg-[#fff4df] rounded shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Library Summary</h2>
          <div className="flex gap-6">
            <div className="flex-1 bg-blue-100 rounded p-4 text-center">
              <h3 className="text-lg font-semibold">Books Borrowed</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="flex-1 bg-yellow-100 rounded p-4 text-center">
              <h3 className="text-lg font-semibold">Books Due Soon</h3>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div className="flex-1 bg-red-100 rounded p-4 text-center">
              <h3 className="text-lg font-semibold">Fines</h3>
              <p className="text-3xl font-bold">$0</p>
            </div>
          </div>
        </section>

        <section className="bg-[#fff4df] rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="btn-sec px-6 py-3 rounded hover:bg-sec-dark transition">
              Browse Books
            </button>
            <button className="btn-pri px-6 py-3 rounded hover:bg-pri-dark transition">
              Return a Book
            </button>
            <button className="btn-sec px-6 py-3 rounded hover:bg-sec-dark transition">
              View Borrow History
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
