import { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Props {
  Id: string
  initialStatus: boolean;
}

const JobStatusUpdater: React.FC<Props> = ({ initialStatus }) => {

  const { id } = useParams(); // Destructure id directly
  const Id = id;

  const [status, setStatus] = useState<boolean | null>(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (updateApproved: boolean) => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/update-Job/${Id}`, {  Id: Id, approved: updateApproved });
      setStatus(updateApproved);
    } catch (error) {
      console.error('Error updating job status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Status</p>
        <>
          <button onClick={() => handleStatusUpdate(true)} disabled={loading}>
            Approve
          </button>
          <button onClick={() => handleStatusUpdate(false)} disabled={loading}>
            Reject
          </button>
        </>
    </div>
  );
};

export default JobStatusUpdater;