import { useState } from 'react';
import apiClient from '../../api/client';
import type { Application, ApproveRequest } from '../../types';

interface Props {
  app: Application;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApproveModal({ app, onClose, onSuccess }: Props) {
  const [action, setAction] = useState<ApproveRequest['action']>('APPROVE');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: ApproveRequest = {
        applicationId: app.applicationId,
        approverName: 'Approver Demo',
        action,
        comment,
      };
      await apiClient.post('/approver/decide', payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-2">Make Decision</h3>
        <p>Applicant: {app.applicantName}</p>
        <div className="my-3">
          <label className="block mb-1">Action</label>
          <select value={action} onChange={(e) => setAction(e.target.value as any)} className="w-full border p-2 rounded">
            <option value="APPROVE">Approve</option>
            <option value="REJECT">Reject</option>
            <option value="REREVIEW">Request Rereview</option>
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
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}