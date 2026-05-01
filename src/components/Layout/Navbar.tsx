import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">IC4537 Trade License</Link>
        <div className="space-x-4">
          <Link to="/customer" className="hover:underline">Customer</Link>
          <Link to="/reviewer" className="hover:underline">Reviewer</Link>
          <Link to="/approver" className="hover:underline">Approver</Link>
        </div>
      </div>
    </nav>
  );
}