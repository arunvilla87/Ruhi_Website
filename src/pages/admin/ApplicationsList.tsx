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