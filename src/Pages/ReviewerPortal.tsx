import { useState } from 'react';
import PendingList from '../components/Reviewer/PendingList';
import ReviewModal from '../components/Reviewer/ReviewModal';
import type { Application } from '../types';

export default function ReviewerPortal() {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="container mx-auto py-8">
      <PendingList key={refreshKey} onSelect={setSelectedApp} />
      {selectedApp && (
        <ReviewModal app={selectedApp} onClose={() => setSelectedApp(null)} onSuccess={handleSuccess} />
      )}
    </div>
  );
}