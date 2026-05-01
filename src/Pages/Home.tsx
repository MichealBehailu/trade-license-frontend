import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Trade License Management System</h1>
      <p className="mb-8">Select your role:</p>
      <div className="flex justify-center gap-4">
        <Link to="/customer" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Customer Portal
        </Link>
        <Link to="/reviewer" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
          Reviewer Portal
        </Link>
        <Link to="/approver" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          Approver Portal
        </Link>
      </div>
    </div>
  );
}