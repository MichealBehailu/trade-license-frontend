import { useState } from 'react';
import apiClient from '../../api/client';
import type { Application, ReviewRequest } from '../../types';

interface Props {
  app: Application;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ app, onClose, onSuccess }: Props) {
  const [action, setAction] = useState<ReviewRequest['action']>('ACCEPT');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: ReviewRequest = {
        applicationId: app.applicationId,
        reviewerName: 'Reviewer Demo', // You can replace with logged-in user name
        action,
        comment,
      };
      await apiClient.post('/reviewer/review', payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Review failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h3 className="text-xl font-bold mb-2">Review Application</h3>
        <p>Applicant: {app.applicantName}</p>
        <p>License: {app.commodityName}</p>
        <div className="my-3">
          <label className="block mb-1 font-medium">Decision</label>
          <select value={action} onChange={(e) => setAction(e.target.value as any)} className="w-full border p-2 rounded">
            <option value="ACCEPT">Accept</option>
            <option value="REJECT">Reject</option>
            <option value="ADJUST">Request Adjustment</option>
          </select>
        </div>
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}