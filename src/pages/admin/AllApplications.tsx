// Update the handleDownloadResume function
const handleDownloadResume = async (application: ApplicationWithJob) => {
  if (!application.resume_url) {
    alert('No resume available for this application');
    return;
  }

  try {
    setDownloadingId(application.id);
    const response = await fetch(application.resume_url);
    if (!response.ok) throw new Error('Failed to download file');
    
    const blob = await response.blob();
    const fileExtension = application.resume_url.split('.').pop() || 'pdf';
    const fileName = `${application.full_name.replace(/\s+/g, '_')}_resume.${fileExtension}`;
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Failed to download resume. Please try again.');
  } finally {
    setDownloadingId(null);
  }
};

// Update the updateApplicationStatus function
const updateApplicationStatus = async (applicationId: string, newStatus: ApplicationStatus) => {
  try {
    const { error } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', applicationId);

    if (error) throw error;
    
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

export default updateApplicationStatus