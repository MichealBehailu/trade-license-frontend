import { useState } from 'react';
import apiClient from '../../api/client';
import FileUploader from './FileUploader';
import type { SubmitRequest } from '../../types';

export default function SubmitForm() {
  const [form, setForm] = useState<SubmitRequest>({
    specificLicense: '',
    attachmentUrls: [],
    paymentAmount: 0,
    paymentReference: '',
    applicantName: '',
    applicantEmail: '',
    commodityName: '',
    commodityDescription: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ id: string; status: string } | null>(null);

  const handleFileUpload = (url: string) => {
    setForm((prev) => ({ ...prev, attachmentUrls: [...prev.attachmentUrls, url] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/customer/submit', form);
      setResult({ id: res.data.applicationId, status: res.data.status });
    } catch (err: any) {
      alert(err.response?.data?.error || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply for Trade License</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Simple inputs */}
        <input name="applicantName" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="applicantEmail" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="specificLicense" placeholder="License Type (e.g. Restaurant)" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="commodityName" placeholder="Commodity Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="commodityDescription" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" rows={3} />
        <input name="paymentAmount" type="number" step="0.01" placeholder="Payment Amount" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="paymentReference" placeholder="Payment Ref" onChange={handleChange} className="w-full border p-2 rounded" required />

        <div>
          <label className="block mb-1 font-medium">Attachments (documents)</label>
          <FileUploader onUploadComplete={handleFileUpload} />
          {form.attachmentUrls.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {form.attachmentUrls.map((url, i) => (
                <li key={i}>{url}</li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p>Application ID: {result.id}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}