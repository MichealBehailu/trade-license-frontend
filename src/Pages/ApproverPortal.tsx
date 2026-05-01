import { useState } from 'react';
import AcceptedList from '../components/Approver/AcceptedList';
import ApproveModal from '../components/Approver/ApproveModal';
import type { Application } from '../types';

export default function ApproverPortal() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="container mx-auto py-8">
      <AcceptedList key={refreshKey} onSelect={setSelectedApp} />
      {selectedApp && (
        <ApproveModal app={selectedApp} onClose={() => setSelectedApp(null)} onSuccess={handleSuccess} />
      )}
    </div>
  );
}