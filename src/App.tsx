import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import JobForm from './pages/admin/JobForm';
import ApplicationsList from './pages/admin/ApplicationsList';
import AllApplications from './pages/admin/AllApplications';
import JobDetails from './pages/careers/JobDetails';
import JobApplication from './pages/careers/JobApplication';
import ApplicationSuccess from './pages/careers/ApplicationSuccess';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<JobDetails />} />
        <Route path="/careers/:id/apply" element={<JobApplication />} />
        <Route path="/careers/:id/success" element={<ApplicationSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/jobs/new" element={<JobForm />} />
        <Route path="/admin/jobs/:id" element={<JobForm />} />
        <Route path="/admin/jobs/:id/applications" element={<ApplicationsList />} />
        <Route path="/admin/applications" element={<AllApplications />} />
      </Routes>
    </>
  );
}

export default App;