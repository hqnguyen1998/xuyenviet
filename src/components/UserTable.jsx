const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

export default function UserTable() {
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Users List</h1>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-md'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='border p-3 text-left'>Name</th>
              <th className='border p-3 text-left'>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-b hover:bg-gray-100'>
                <td className='border p-3'>{user.name}</td>
                <td className='border p-3'>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
