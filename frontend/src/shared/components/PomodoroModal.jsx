import React, { useState } from "react";
import Button from "./Button";
import { update_Timer_Values } from '../../api/pomodoro.api.js';

const PomodoroModal = ({ onClose, dispatch, currentSettings }) => {
  
  const [form, setForm] = useState({
    work: currentSettings.work,
    shortBreak: currentSettings.shortBreak,
    longBreak: currentSettings.longBreak,
    cycles: currentSettings.cycles,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  const handleUpdate = async () => {
    try {
      await update_Timer_Values(form);

    } catch (error) {
      console.error("Error updating pomodoro settings:", error);
      alert("Failed to update settings. Please try again.");
    }
  
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-primary">
          Customize Pomodoro Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Work Duration (mins)</label>
            <input
              type="number"
              name="work"
              value={form.work}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Short Break (mins)</label>
            <input
              type="number"
              name="shortBreak"
              value={form.shortBreak}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Long Break (mins)</label>
            <input
              type="number"
              name="longBreak"
              value={form.longBreak}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cycles Before Long Break</label>
            <input
              type="number"
              name="cycles"
              value={form.cycles}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button className="mt-4 bg-secondary outline-primary outline-1 text-primary px-4 py-2 rounded cursor-pointer" onClick={onClose}>
            Cancel
          </Button>
          <Button className="mt-4 bg-primary text-white px-4 py-2 rounded cursor-pointer" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroModal;
