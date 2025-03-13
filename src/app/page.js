'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [zaloName, setZaloName] = useState('');
  const [ingameName, setIngameName] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  async function handleSubmit() {
    const userData = { zaloName, ingameName };

    if (editId) {
      await fetch(`/api/users/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      setEditId(null);
    } else {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    }

    setZaloName('');
    setIngameName('');
    fetchUsers();
  }

  async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
    setConfirmDelete(null);
  }

  function editUser(user) {
    setEditId(user._id);
    setZaloName(user.zaloName);
    setIngameName(user.ingameName);
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-900 dark:to-black'>
      {/* Navbar with Theme Toggle */}
      <div className='flex justify-between items-center w-full max-w-4xl mb-6 px-4'>
        <motion.h1
          className='text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-300 dark:to-purple-400'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Quản Lý Danh Sách QĐ Xuyên Việt
        </motion.h1>
        {/* <ThemeToggle /> */}
      </div>

      {/* Add/Edit User Form */}
      <motion.div
        className='glass p-6 rounded-lg shadow-lg mb-6 max-w-xl w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className='grid grid-cols-1 gap-3'>
          <input
            className='border p-2 rounded-md bg-white dark:bg-gray-800 dark:text-white w-full'
            type='text'
            placeholder='Tên Zalo'
            value={zaloName}
            onChange={(e) => setZaloName(e.target.value)}
          />
          <input
            className='border p-2 rounded-md bg-white dark:bg-gray-800 dark:text-white w-full'
            type='text'
            placeholder='Tên Ingame'
            value={ingameName}
            onChange={(e) => setIngameName(e.target.value)}
          />
          <motion.button
            className={`p-2 rounded-md text-white w-full ${
              editId ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >
            {editId ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}
          </motion.button>
        </div>
      </motion.div>

     

      {/* Users Table */}
      <div className='overflow-x-auto w-full max-w-4xl'>
        <table className='w-full glass rounded-lg shadow-md'>
          <thead className='bg-gray-700 dark:bg-gray-800 text-white'>
            <tr>
              <th className='border p-3 text-left'>STT</th>
              <th className='border p-3 text-left'>Tên Zalo</th>
              <th className='border p-3 text-left'>Tên Ingame</th>
              <th className='border p-3 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className='animate-pulse'>
                    <td className='border p-3 bg-gray-700 h-10'></td>
                    <td className='border p-3 bg-gray-700 h-10'></td>
                    <td className='border p-3 bg-gray-700 h-10'></td>
                    <td className='border p-3 bg-gray-700 h-10'></td>
                  </tr>
                ))
              : users.map((user, i) => (
                  <tr
                    key={user._id}
                    className='hover:bg-gray-700 dark:hover:bg-gray-800'
                  >
                    <td className='border p-3'>{i + 1}</td>
                    <td className='border p-3'>{user.zaloName}</td>
                    <td className='border p-3'>{user.ingameName}</td>
                    <td className='border p-3'>
                      <button
                        className='bg-green-500 text-white p-2 rounded-md mr-2'
                        onClick={() => editUser(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className='bg-red-500 text-white p-2 rounded-md'
                        onClick={() => setConfirmDelete(user._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        
      </div>
       {/* Delete Confirmation Popup */}
       <AnimatePresence>
                {confirmDelete && (
                    <motion.div 
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-gray-800 p-6 rounded-md shadow-lg"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-white text-lg font-bold mb-4">Bạn có chắc chắn?</h2>
                            <p className="text-gray-400 mb-6">Bạn có chắc muốn xóa người dùng này? Hành động này không thể hoàn tác.</p>
                            <div className="flex justify-end space-x-4">
                                <button className="bg-gray-500 text-white p-2 rounded-md" onClick={() => setConfirmDelete(null)}>Hủy</button>
                                <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => deleteUser(confirmDelete)}>Xóa</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
       
    </div>
  );
}
