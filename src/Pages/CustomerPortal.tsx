import SubmitForm from '../components/Customer/SubmitForm';
import StatusCheck from '../components/Customer/StatusCheck';

export default function CustomerPortal() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <SubmitForm />
      <StatusCheck />
    </div>
  );
}