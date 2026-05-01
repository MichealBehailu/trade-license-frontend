import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import apiClient from '../../api/client';

interface Props {
  onUploadComplete: (fileUrl: string) => void;
}

export default function FileUploader({ onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await apiClient.post<{ fileUrl: string }>('/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadComplete(res.data.fileUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p className="text-blue-500">Uploading...</p>
      ) : (
        <p className="text-gray-500">Drag & drop a file here, or click to select</p>
      )}
    </div>
  );
}