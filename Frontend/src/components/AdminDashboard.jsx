import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    rationale: '',
    tag: 'DV',
    link: '',
    tags: '',
    year: new Date().getFullYear().toString(),
    order: 0,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    verifyAndLoad();
  }, []);

  const verifyAndLoad = async () => {
    try {
      await api.get('/auth/verify');
      await loadProjects();
    } catch {
      localStorage.removeItem('admin_token');
      navigate('/admin');
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      rationale: '',
      tag: 'DV',
      link: '',
      tags: '',
      year: new Date().getFullYear().toString(),
      order: 0,
    });
    setImageFiles([]);
    setExistingImages([]);
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    imageFiles.forEach((file) => formData.append('images', file));
    if (editing) {
      formData.append('existingImages', JSON.stringify(existingImages));
    }

    try {
      if (editing) {
        await api.put(`/projects/${editing}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Project updated!');
      } else {
        await api.post('/projects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSuccess('Project created!');
      }
      resetForm();
      await loadProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      rationale: project.rationale || '',
      tag: project.tag,
      link: project.link || '',
      tags: project.tags?.join(', ') || '',
      year: project.year || new Date().getFullYear().toString(),
      order: project.order || 0,
    });
    setExistingImages(project.images || []);
    setEditing(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setSuccess('Project deleted!');
      await loadProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-charcoal text-cream px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-lg font-bold">Portfolio Admin</h1>
        <div className="flex gap-3">
          <a href="/" className="text-sm text-cream/70 hover:text-amber transition-colors">
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-cream/70 hover:text-amber transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Messages */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
            {success}
          </div>
        )}

        {/* Toggle form button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-charcoal">
            {showForm ? (editing ? 'Edit Project' : 'New Project') : 'Projects'}
          </h2>
          <button
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
            className="bg-charcoal text-cream px-5 py-2 rounded-xl text-sm font-medium hover:bg-amber hover:text-charcoal transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Project'}
          </button>
        </div>

        {/* Project Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-cream rounded-2xl p-6 mb-10 flex flex-col gap-4 shadow-sm border border-gray-light"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
              <select
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              >
                <option value="DV">DV — Development</option>
                <option value="UX">UX — UX Design</option>
              </select>
            </div>

            <textarea
              placeholder="Description *"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber resize-none"
            />

            <textarea
              placeholder="Rationale / Design Process (optional)"
              value={form.rationale}
              onChange={(e) => setForm({ ...form, rationale: e.target.value })}
              rows={3}
              className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber resize-none"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Link to project (optional)"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
              <input
                type="text"
                placeholder="Tags (comma separated, e.g. React, Figma)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>

            <input
              type="text"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-light bg-off-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-amber"
            />

            {/* Image upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-charcoal">Add Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles((prev) => [...prev, ...Array.from(e.target.files)])}
                className="text-sm text-charcoal file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-charcoal file:text-cream hover:file:bg-amber hover:file:text-charcoal file:transition-colors file:cursor-pointer"
              />
              <p className="text-xs text-gray-warm">You can select multiple files at once, or add more by clicking again.</p>
            </div>

            {/* Existing images when editing */}
            {editing && existingImages.length > 0 && (
              <div>
                <label className="text-sm text-gray-warm mb-2 block">Current images (click to remove):</label>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'}${img}`}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg border border-gray-light"
                      />
                      <button
                        type="button"
                        onClick={() => setExistingImages(existingImages.filter((_, j) => j !== i))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New image previews */}
            {imageFiles.length > 0 && (
              <div>
                <label className="text-sm text-gray-warm mb-2 block">New images to upload:</label>
                <div className="flex flex-wrap gap-3">
                  {imageFiles.map((file, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg border border-amber"
                      />
                      <button
                        type="button"
                        onClick={() => setImageFiles(imageFiles.filter((_, j) => j !== i))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="self-end bg-charcoal text-cream px-8 py-3 rounded-xl text-sm font-medium hover:bg-amber hover:text-charcoal transition-colors"
            >
              {editing ? 'Update Project' : 'Create Project'}
            </button>
          </form>
        )}

        {/* Projects List */}
        {loading ? (
          <p className="text-gray-warm text-sm">Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-warm text-lg mb-2">No projects yet</p>
            <p className="text-gray-warm/60 text-sm">Click "+ Add Project" to create your first one.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-cream rounded-xl p-5 border border-gray-light flex flex-col md:flex-row md:items-center gap-4"
              >
                {project.images?.length > 0 && (
                  <img
                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'}${project.images[0]}`}
                    alt={project.title}
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-charcoal truncate">{project.title}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        project.tag === 'UX'
                          ? 'bg-amber/20 text-amber'
                          : 'bg-charcoal/10 text-charcoal'
                      }`}
                    >
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-warm line-clamp-2">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener"
                      className="text-xs text-amber hover:underline mt-1 inline-block"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-sm px-4 py-2 rounded-lg bg-off-white border border-gray-light text-charcoal hover:bg-amber hover:text-charcoal hover:border-amber transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-sm px-4 py-2 rounded-lg bg-off-white border border-gray-light text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
