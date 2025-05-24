import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';

// Mock data for applications
const applications = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Senior Software Engineer',
    email: 'john@example.com',
    appliedDate: '2025-02-19',
    status: 'Under Review'
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Product Manager',
    email: 'jane@example.com',
    appliedDate: '2025-02-18',
    status: 'Interviewing'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'UX Designer',
    email: 'mike@example.com',
    appliedDate: '2025-02-17',
    status: 'Pending'
  }
];

export default function AllApplications() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Applications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>{application.appliedDate}</TableCell>
              <TableCell>{application.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}