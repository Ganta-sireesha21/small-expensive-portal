import { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import JobsTable from '../components/JobsTable';
import JobForm from '../components/JobForm';
import { MdAdd } from 'react-icons/md';
import '../styles/Dashboard.css';

export default function Dashboard({ onLogout, currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');
  const [formLoading, setFormLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch jobs');
        console.error('Fetch error:', error);
      } else {
        setJobs(data || []);
      }
    } catch (err) {
      toast.error('An error occurred while fetching jobs');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      setFormLoading(true);
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) {
        toast.error('Failed to delete job');
        console.error('Delete error:', error);
      } else {
        toast.success('Job deleted successfully');
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
      }
    } catch (err) {
      toast.error('An error occurred while deleting the job');
      console.error('Error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      setFormLoading(true);

      if (editingJob) {
        // Update existing job
        const { error } = await supabase
          .from('jobs')
          .update(formData)
          .eq('id', editingJob.id);

        if (error) {
          toast.error('Failed to update job');
          console.error('Update error:', error);
        } else {
          toast.success('Job updated successfully');
          setJobs((prev) =>
            prev.map((job) =>
              job.id === editingJob.id ? { ...job, ...formData } : job
            )
          );
          setShowForm(false);
          setEditingJob(null);
        }
      } else {
        // Create new job
        const { data, error } = await supabase
          .from('jobs')
          .insert([formData])
          .select();

        if (error) {
          toast.error('Failed to create job');
          console.error('Create error:', error);
        } else {
          toast.success('Job created successfully');
          if (data && data.length > 0) {
            setJobs((prev) => [data[0], ...prev]);
          }
          setShowForm(false);
        }
      }
    } catch (err) {
      toast.error('An error occurred while saving the job');
      console.error('Error:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Failed to logout');
      } else {
        toast.success('Logged out successfully');
        onLogout();
      }
    } catch (err) {
      toast.error('An error occurred during logout');
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Job Management</h1>
          <p className="user-info">Logged in as: {currentUser?.email}</p>
        </header>

        <div className="dashboard-content">
          {activeTab === 'jobs' && (
            <>
              {!showForm ? (
                <>
                  <div className="section-header">
                    <h2>Jobs</h2>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddJob}
                      disabled={loading || formLoading}
                    >
                      <MdAdd /> Add New Job
                    </button>
                  </div>

                  <JobsTable
                    jobs={jobs}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                    loading={formLoading}
                  />
                </>
              ) : (
                <div className="form-section">
                  <h2>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
                  <JobForm
                    onSubmit={handleSubmitForm}
                    onCancel={handleCancel}
                    initialData={editingJob}
                    loading={formLoading}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
