"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [zaloName, setZaloName] = useState("");
    const [ingameName, setIngameName] = useState("");
    const [editId, setEditId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [filterZalo, setFilterZalo] = useState(""); // Filter for Tên Zalo
    const [filterIngame, setFilterIngame] = useState(""); // Filter for Tên Ingame

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    }

    async function handleSubmit() {
        const userData = { zaloName, ingameName };
        
        if (editId) {
            await fetch(`/api/users/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            setEditId(null);
        } else {
            await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
        }

        setZaloName(""); setIngameName("");
        fetchUsers();
    }

    async function deleteUser(id) {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      fetchUsers();
      setConfirmDelete(null);
  }

    function editUser(user) {
        setEditId(user._id);
        setZaloName(user.zaloName);
        setIngameName(user.ingameName);
    }

    // Apply Filters
    const filteredUsers = users.filter(user => 
        user.zaloName.toLowerCase().includes(filterZalo.toLowerCase()) &&
        user.ingameName.toLowerCase().includes(filterIngame.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Navbar with Theme Toggle */}
            <div className="flex justify-between items-center mb-6">
                <motion.h1 
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Quản Lý Danh Sách QĐ Xuyên Việt
                </motion.h1>
                <ThemeToggle />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6">
                <input 
                    className="border p-2 rounded-md bg-gray-700 text-white w-full md:w-1/2"
                    type="text" placeholder="Tìm theo Tên Zalo"
                    value={filterZalo} onChange={(e) => setFilterZalo(e.target.value)}
                />
                <input 
                    className="border p-2 rounded-md bg-gray-700 text-white w-full md:w-1/2"
                    type="text" placeholder="Tìm theo Tên Ingame"
                    value={filterIngame} onChange={(e) => setFilterIngame(e.target.value)}
                />
            </div>

            {/* Add/Edit User Form */}
            <motion.div 
                className="p-6 rounded-md mb-6 shadow-md max-w-xl mx-auto w-full bg-gray-800 text-white dark:bg-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="grid grid-cols-1 gap-3">
                    <input className="border p-2 rounded-md bg-gray-700 text-white w-full" type="text" placeholder="Tên Zalo" value={zaloName} onChange={(e) => setZaloName(e.target.value)} />
                    <input className="border p-2 rounded-md bg-gray-700 text-white w-full" type="text" placeholder="Tên Ingame" value={ingameName} onChange={(e) => setIngameName(e.target.value)} />
                    <motion.button className={`p-2 rounded-md text-white w-full ${editId ? "bg-yellow-500" : "bg-blue-500"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit}>
                        {editId ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
                    </motion.button>
                </div>
            </motion.div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-700 rounded-lg shadow-md bg-gray-800 text-white dark:bg-gray-900">
                    <thead className="bg-gray-700 dark:bg-gray-800">
                        <tr>
                            <th className="border p-3 text-left">Tên Zalo</th>
                            <th className="border p-3 text-left">Tên Ingame</th>
                            <th className="border p-3 text-left">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-800">
                                <td className="border p-3">{user.zaloName}</td>
                                <td className="border p-3">{user.ingameName}</td>
                                <td className="border p-3">
                                    <button className="bg-green-500 text-white p-2 rounded-md mr-2" onClick={() => editUser(user)}>Sửa</button>
                                    <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setConfirmDelete(user._id)}>Xóa</button>                                </td>
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
