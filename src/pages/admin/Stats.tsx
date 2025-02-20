import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Users, Briefcase, Clock, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface ApplicantStats {
  email: string;
  full_name: string;
  total_applications: number;
  applications: {
    job_title: string;
    status: string;
    created_at: string;
  }[];
}

interface Stats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  uniqueApplicants: number;
  applicationsByStatus: {
    pending: number;
    reviewed: number;
    accepted: number;
    rejected: number;
  };
  applicationsByPeriod: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  jobsByPeriod: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  detailedApplicantStats: ApplicantStats[];
}

export default function Stats() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    uniqueApplicants: 0,
    applicationsByStatus: {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0
    },
    applicationsByPeriod: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    },
    jobsByPeriod: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    },
    detailedApplicantStats: []
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      navigate('/admin/login');
    }
  };

  const fetchStats = async () => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();

      // Fetch jobs statistics
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id, status, created_at');

      if (jobsError) throw jobsError;

      // Fetch applications with job details
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select(`
          id,
          email,
          full_name,
          status,
          created_at,
          jobs:job_id (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;

      // Process detailed applicant statistics
      const applicantMap = new Map<string, ApplicantStats>();
      (applicationsData || []).forEach((app: any) => {
        const jobTitle = app.jobs?.title || 'Unknown Position';
        
        if (!applicantMap.has(app.email)) {
          applicantMap.set(app.email, {
            email: app.email,
            full_name: app.full_name,
            total_applications: 1,
            applications: [{
              job_title: jobTitle,
              status: app.status,
              created_at: app.created_at
            }]
          });
        } else {
          const applicant = applicantMap.get(app.email)!;
          applicant.total_applications++;
          applicant.applications.push({
            job_title: jobTitle,
            status: app.status,
            created_at: app.created_at
          });
        }
      });

      const detailedApplicantStats = Array.from(applicantMap.values())
        .sort((a, b) => b.total_applications - a.total_applications);

      // Calculate statistics
      const uniqueApplicants = applicantMap.size;

      // Calculate job statistics
      const jobStats = {
        total: jobsData.length,
        active: jobsData.filter(job => job.status === 'open').length,
        today: jobsData.filter(job => job.created_at >= today).length,
        thisWeek: jobsData.filter(job => job.created_at >= weekAgo).length,
        thisMonth: jobsData.filter(job => job.created_at >= monthAgo).length
      };

      // Calculate application statistics
      const appStats = {
        total: applicationsData.length,
        byStatus: {
          pending: applicationsData.filter(app => app.status === 'pending').length,
          reviewed: applicationsData.filter(app => app.status === 'reviewed').length,
          accepted: applicationsData.filter(app => app.status === 'accepted').length,
          rejected: applicationsData.filter(app => app.status === 'rejected').length
        },
        today: applicationsData.filter(app => app.created_at >= today).length,
        thisWeek: applicationsData.filter(app => app.created_at >= weekAgo).length,
        thisMonth: applicationsData.filter(app => app.created_at >= monthAgo).length
      };

      setStats({
        totalJobs: jobStats.total,
        activeJobs: jobStats.active,
        totalApplications: appStats.total,
        uniqueApplicants,
        applicationsByStatus: appStats.byStatus,
        applicationsByPeriod: {
          today: appStats.today,
          thisWeek: appStats.thisWeek,
          thisMonth: appStats.thisMonth
        },
        jobsByPeriod: {
          today: jobStats.today,
          thisWeek: jobStats.thisWeek,
          thisMonth: jobStats.thisMonth
        },
        detailedApplicantStats
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050A0A] text-[#E5FFFC]">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E5FFFC] opacity-70">Total Jobs</p>
              <h3 className="text-3xl font-bold text-[#E5FFFC] mt-1">{stats.totalJobs}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-[#00E5D1]" />
            </div>
          </div>
          <p className="text-[#00E5D1] text-sm mt-4">{stats.activeJobs} Active Jobs</p>
        </div>

        <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E5FFFC] opacity-70">Unique Applicants</p>
              <h3 className="text-3xl font-bold text-[#E5FFFC] mt-1">{stats.uniqueApplicants}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-[#00E5D1]" />
            </div>
          </div>
          <p className="text-[#00E5D1] text-sm mt-4">
            {(stats.totalApplications / stats.uniqueApplicants).toFixed(1)} avg applications per applicant
          </p>
        </div>

        <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E5FFFC] opacity-70">Total Applications</p>
              <h3 className="text-3xl font-bold text-[#E5FFFC] mt-1">{stats.totalApplications}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-[#00E5D1]" />
            </div>
          </div>
          <p className="text-[#00E5D1] text-sm mt-4">{stats.applicationsByPeriod.today} Today</p>
        </div>

        <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#E5FFFC] opacity-70">This Month</p>
              <h3 className="text-3xl font-bold text-[#E5FFFC] mt-1">{stats.applicationsByPeriod.thisMonth}</h3>
            </div>
            <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#00E5D1]" />
            </div>
          </div>
          <p className="text-[#00E5D1] text-sm mt-4">{stats.jobsByPeriod.thisMonth} New Jobs</p>
        </div>
      </div>

      {/* Application Status */}
      <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
        <h3 className="text-xl font-bold text-[#E5FFFC] mb-6">Application Status</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#E5FFFC] opacity-70">Pending</span>
              <span className="text-[#E5FFFC]">{stats.applicationsByStatus.pending}</span>
            </div>
            <div className="h-2 bg-[#008F85]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{
                  width: `${(stats.applicationsByStatus.pending / stats.totalApplications) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#E5FFFC] opacity-70">Reviewed</span>
              <span className="text-[#E5FFFC]">{stats.applicationsByStatus.reviewed}</span>
            </div>
            <div className="h-2 bg-[#008F85]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${(stats.applicationsByStatus.reviewed / stats.totalApplications) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#E5FFFC] opacity-70">Accepted</span>
              <span className="text-[#E5FFFC]">{stats.applicationsByStatus.accepted}</span>
            </div>
            <div className="h-2 bg-[#008F85]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${(stats.applicationsByStatus.accepted / stats.totalApplications) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#E5FFFC] opacity-70">Rejected</span>
              <span className="text-[#E5FFFC]">{stats.applicationsByStatus.rejected}</span>
            </div>
            <div className="h-2 bg-[#008F85]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{
                  width: `${(stats.applicationsByStatus.rejected / stats.totalApplications) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Applicant List */}
      <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20">
        <h3 className="text-xl font-bold text-[#E5FFFC] mb-6">Applicant Details</h3>
        <div className="space-y-4">
          {stats.detailedApplicantStats.map((applicant, index) => (
            <div key={index} className="border-b border-[#008F85]/20 last:border-0 pb-4">
              <button
                onClick={() => setExpandedApplicant(expandedApplicant === applicant.email ? null : applicant.email)}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-[#E5FFFC] font-medium text-left">{applicant.full_name}</h4>
                      <p className="text-[#E5FFFC] opacity-70 text-sm text-left">{applicant.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#00E5D1]">{applicant.total_applications} applications</span>
                    {expandedApplicant === applicant.email ? (
                      <ChevronUp className="h-5 w-5 text-[#E5FFFC]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#E5FFFC]" />
                    )}
                  </div>
                </div>
              </button>
              
              {expandedApplicant === applicant.email && (
                <div className="mt-4 pl-4 space-y-3">
                  {applicant.applications.map((application, appIndex) => (
                    <div key={appIndex} className="flex items-center justify-between bg-[#008F85]/5 p-3 rounded-lg">
                      <div>
                        <p className="text-[#E5FFFC]">{application.job_title}</p>
                        <p className="text-[#E5FFFC] opacity-70 text-sm">{formatDate(application.created_at)}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}