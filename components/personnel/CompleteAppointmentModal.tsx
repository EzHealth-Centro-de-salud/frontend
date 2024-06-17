import React, { useState } from 'react';

interface CompleteAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { diagnosis: string; prescription: string }) => void;
}

const CompleteAppointmentModal: React.FC<CompleteAppointmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ diagnosis, prescription });
    setDiagnosis('');
    setPrescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Complete la Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosis">
              Diagnosis
            </label>
            <input
              type="text"
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prescription">
              Prescription
            </label>
            <textarea
              id="prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteAppointmentModal;
