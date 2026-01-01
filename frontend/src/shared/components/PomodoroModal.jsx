import React, { useState } from "react";

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

  const handleSave = () => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: {
        workDuration: form.work * 60,
        shortBreak: form.shortBreak * 60,
        longBreak: form.longBreak * 60,
        cyclesBeforeLongBreak: form.cycles,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
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
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroModal;
