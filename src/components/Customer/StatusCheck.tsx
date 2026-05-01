import { useState } from 'react';
import apiClient from '../../api/client';

export default function StatusCheck() {
  const [appId, setAppId] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!appId) return;
    try {
      const res = await apiClient.get(`/customer/status/${appId}`);
      setStatus(res.data.status);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Not found');
      setStatus(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Check Application Status</h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Application ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button onClick={handleCheck} className="bg-gray-700 text-white px-4 rounded hover:bg-gray-800">
          Check
        </button>
      </div>
      {status && <p className="mt-2 text-green-600">Status: {status}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}