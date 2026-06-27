export default function Settings() {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 h-full">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">General</h2>
          <p className="text-gray-400">Configure general application settings.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <p className="text-gray-400">Manage notification preferences.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <p className="text-gray-400">Update your account information.</p>
        </div>
      </div>
    </div>
  );
}