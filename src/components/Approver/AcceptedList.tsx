import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import type { Application } from '../../types';

interface Props {
  onSelect: (app: Application) => void;
}

export default function AcceptedList({ onSelect }: Props) {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    apiClient.get('/approver/accepted').then((res) => setApps(res.data));
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-3">Accepted (awaiting approval)</h3>
      {apps.length === 0 && <p>No accepted applications.</p>}
      <ul className="divide-y">
        {apps.map((app) => (
          <li key={app.applicationId} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{app.applicantName}</p>
              <p className="text-sm text-gray-500">{app.commodityName}</p>
            </div>
            <button
              onClick={() => onSelect(app)}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Approve/Decide
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}