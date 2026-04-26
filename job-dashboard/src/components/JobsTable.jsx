import { MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import { useState, useMemo } from 'react';
import '../styles/JobsTable.css';

const ITEMS_PER_PAGE = 5;

export default function JobsTable({
  jobs,
  onEdit,
  onDelete,
  loading = false,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLocation, setFilterLocation] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        filterLocation === '' || job.location === filterLocation;

      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchTerm, filterLocation]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedJobs = filteredJobs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const uniqueLocations = [...new Set(jobs.map((job) => job.location))].sort();

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="jobs-table-container">
      <div className="table-controls">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-box">
          <select value={filterLocation} onChange={handleFilterChange}>
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="no-data">
          <p>No jobs found.</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Salary</th>
                  <th>Location</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="job-title">{job.title}</td>
                    <td>${job.salary.toLocaleString()}</td>
                    <td>{job.location}</td>
                    <td>{new Date(job.created_at).toLocaleDateString()}</td>
                    <td className="table-actions">
                      <button
                        className="btn-icon edit"
                        onClick={() => onEdit(job)}
                        disabled={loading}
                        title="Edit job"
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => onDelete(job.id)}
                        disabled={loading}
                        title="Delete job"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="page-info">
                Page {currentPage} of {totalPages} ({filteredJobs.length} total)
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
