
import React, { useState } from 'react';
import { useAppContext } from '../App';

const CertificatesPage = () => {
  const { certificates, addCertificate, deleteCertificate } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuer: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    skills: '',
    category: '',
    imageUrl: '/placeholder.svg',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertificate({
      ...newCertificate,
      skills: newCertificate.skills.split(',').map(s => s.trim()),
    });
    resetForm();
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCertificate({ ...newCertificate, [name]: value });
  };

  const resetForm = () => {
    setNewCertificate({
      title: '',
      issuer: '',
      date: new Date().toISOString().split('T')[0],
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      skills: '',
      category: '',
      imageUrl: '/placeholder.svg',
    });
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.title.toLowerCase().includes(search.toLowerCase()) || 
    cert.category.toLowerCase().includes(search.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Certificates</h1>
          <p className="text-gray-600">
            Manage your professional certifications
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Certificate'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add New Certificate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Certificate Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={newCertificate.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="issuer" className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>
                <input
                  id="issuer"
                  name="issuer"
                  value={newCertificate.issuer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Issue Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={newCertificate.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date (Optional)
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={newCertificate.expiryDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                id="category"
                name="category"
                value={newCertificate.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                id="skills"
                name="skills"
                value={newCertificate.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., JavaScript, React, Node.js"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700">
                Credential ID (Optional)
              </label>
              <input
                id="credentialId"
                name="credentialId"
                value={newCertificate.credentialId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="credentialUrl" className="block text-sm font-medium text-gray-700">
                Credential URL (Optional)
              </label>
              <input
                id="credentialUrl"
                name="credentialUrl"
                type="url"
                value={newCertificate.credentialUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Certificate
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col h-full">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium">{cert.title}</h3>
                <button
                  onClick={() => deleteCertificate(cert.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{cert.issuer}</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {cert.category}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                {formatDate(cert.date)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {cert.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto pt-4">
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline flex items-center"
                  >
                    View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No certificates found.</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
