import { Button } from 'components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { useNavigate } from 'react-router-dom';

// Mock data for jobs
const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    postedDate: '2025-02-15',
    applications: 12,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Product Manager',
    postedDate: '2025-02-14',
    applications: 8,
    status: 'Active'
  },
  {
    id: 3,
    title: 'UX Designer',
    postedDate: '2025-02-13',
    applications: 15,
    status: 'Closed'
  }
];

export default function ManageApplications() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <Button onClick={() => navigate('/admin/jobs/new')}>
          Create New Job
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.postedDate}</TableCell>
              <TableCell>{job.applications}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/jobs/${job.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}