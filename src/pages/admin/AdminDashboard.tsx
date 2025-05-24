import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';

// Mock data for dashboard
const dashboardData = {
  totalApplications: 35,
  openPositions: 8,
  recentActivity: [
    'New application received for Senior Software Engineer',
    'Product Manager position closed',
    'UX Designer application status updated'
  ]
};

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalApplications}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.openPositions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dashboardData.recentActivity.map((activity, index) => (
                <li key={index} className="text-gray-600">{activity}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}