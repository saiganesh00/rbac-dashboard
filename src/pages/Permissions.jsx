import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [editingPermission, setEditingPermission] = useState(null);
  const [isAddPermissionModalOpen, setIsAddPermissionModalOpen] = useState(false); // Manage modal visibility
  const [newPermission, setNewPermission] = useState({
    title: '',
    name: '',
    description: '',
    module: '', // This will be automatically set to title
  });

  // Fetch permissions from the server
  useEffect(() => {
    fetch('http://localhost:5000/permissions')
      .then((response) => response.json())
      .then((data) => setPermissions(data));
  }, []);

  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {});

  // Handle Edit
  const handleEdit = (permission) => {
    setEditingPermission(permission);
  };

  const handleUpdate = (updatedPermission) => {
    fetch(`http://localhost:5000/permissions/${updatedPermission.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPermission),
    })
      .then((response) => response.json())
      .then(() => {
        setPermissions((prevPermissions) =>
          prevPermissions.map((permission) =>
            permission.id === updatedPermission.id ? updatedPermission : permission
          )
        );
        setEditingPermission(null); // Close the edit modal
      });
  };

  // Handle Add Permission
  const handleAdd = () => {
    fetch('http://localhost:5000/permissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPermission),
    })
      .then((response) => response.json())
      .then((addedPermission) => {
        setPermissions((prevPermissions) => [...prevPermissions, addedPermission]);
        setIsAddPermissionModalOpen(false); // Close the add permission modal
        setNewPermission({ title: '', name: '', description: '', module: '' }); // Reset form
      });
  };

  // Handle Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/permissions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPermissions((prevPermissions) =>
          prevPermissions.filter((permission) => permission.id !== id)
        );
      });
  };

  // Handle form changes for new permission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setNewPermission((prev) => ({
        ...prev,
        [name]: value,
        module: value, // Set module to title
      }));
    } else {
      setNewPermission((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Permission Management</h1>
        <button
          onClick={() => setIsAddPermissionModalOpen(true)} // Open the add permission modal
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Permission</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
          <div key={module} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{module}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {modulePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{permission.name}</h3>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(permission)} className="text-indigo-600 hover:text-indigo-900">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(permission.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Permission Modal */}
      {isAddPermissionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900">Add New Permission</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Permission Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPermission.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Permission Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newPermission.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newPermission.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddPermissionModalOpen(false)} // Close modal
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingPermission && (
        <EditPermissionModal permission={editingPermission} onUpdate={handleUpdate} onClose={() => setEditingPermission(null)} />
      )}
    </div>
  );
};

// Modal Component for Editing Permissions
const EditPermissionModal = ({ permission, onUpdate, onClose }) => {
  const [updatedPermission, setUpdatedPermission] = useState(permission);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPermission((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedPermission);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-900">Edit Permission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Permission Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedPermission.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={updatedPermission.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Permissions;
