"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

type Device = {
  id: number;
  name: string;
  type: string;
  status: "Online" | "Offline";
};

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = () => {
    if (!deviceName || !deviceType) return;

    if (editingId !== null) {
      setDevices(devices.map(d =>
        d.id === editingId
          ? { ...d, name: deviceName, type: deviceType }
          : d
      ));
      showToast("Device updated successfully");
      setEditingId(null);
    } else {
      const newDevice: Device = {
        id: Date.now(),
        name: deviceName,
        type: deviceType,
        status: Math.random() > 0.5 ? "Online" : "Offline",
      };
      setDevices([...devices, newDevice]);
      showToast("Device added successfully");
    }

    setDeviceName("");
    setDeviceType("");
    setShowModal(false);
  };

  const handleDelete = () => {
    if (confirmDelete !== null) {
      setDevices(devices.filter(d => d.id !== confirmDelete));
      showToast("Device deleted");
      setConfirmDelete(null);
    }
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-br from-[#0f172a] to-[#111827]">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Devices</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30"
        >
          <Plus size={18} />
          Add Device
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-3 top-2 text-white/100" />
        <input
          type="text"
          placeholder="Search device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-2 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Device List */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredDevices.map(device => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/10 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{device.name}</h2>
                  <p className="text-sm text-white/60">{device.type}</p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    device.status === "Online"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {device.status}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeviceName(device.name);
                    setDeviceType(device.type);
                    setEditingId(device.id);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 active:scale-95 transition"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => setConfirmDelete(device.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 active:scale-95 transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#0f172a] p-8 rounded-2xl w-96 border border-white/10"
            >
              <h2 className="text-xl mb-6">
                {editingId ? "Edit Device" : "Add Device"}
              </h2>

              <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full mb-4 p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <input
                type="text"
                placeholder="Device Type"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full mb-6 p-3 rounded-xl bg-white/5 border border-white/10"
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 active:scale-95 transition"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDelete !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#111827] p-6 rounded-xl border border-white/10"
            >
              <p className="mb-4">Are you sure you want to delete this device?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="text-white/60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 bg-blue-600 px-6 py-3 rounded-xl shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}