'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  }

  async function handleSubmit() {
    if (editId) {
      await fetch(`/api/users/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      setEditId(null);
    } else {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
    }
    setName('');
    setEmail('');
    fetchUsers();
  }

  async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter((user) => user._id !== id)); // Optimistic UI update
  }

  function editUser(user) {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <motion.h1
        className='text-3xl md:text-4xl font-bold mb-6 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      {/* Add/Edit User Form */}
      <motion.div
        className='bg-gray-800 p-6 rounded-md mb-6 shadow-md max-w-xl mx-auto w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className='grid grid-cols-1 gap-3'>
          <input
            className='border p-2 rounded-md bg-gray-900 text-white w-full'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='border p-2 rounded-md bg-gray-900 text-white w-full'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.button
            className={`p-2 rounded-md text-white w-full ${
              editId ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >
            {editId ? 'Update User' : 'Add User'}
          </motion.button>
        </div>
      </motion.div>

      {/* Users Table */}
      <div className='overflow-x-auto'>
        <motion.table
          className='w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className='bg-gray-700'>
            <tr>
              <th className='border p-3 text-left text-white'>Name</th>
              <th className='border p-3 text-left text-white'>Email</th>
              <th className='border p-3 text-left text-white'>Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  className='border-b border-gray-600 hover:bg-gray-700'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className='border p-3'>{user.name}</td>
                  <td className='border p-3'>{user.email}</td>
                  <td className='border p-3 flex flex-wrap gap-2 justify-center md:justify-start'>
                    <motion.button
                      className='bg-green-500 text-white p-1 px-3 rounded-md'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      className='bg-red-500 text-white p-1 px-3 rounded-md'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </motion.table>
      </div>
    </div>
  );
}
