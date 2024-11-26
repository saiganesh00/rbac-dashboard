import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const Roles = () => {
  const [roles, setRoles] = useState([]);  // Store roles fetched from the API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', module: '', description: '', permissions: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);

  // Fetch roles from the API when the component mounts
  useEffect(() => {
    fetchRoles();
  }, []);

  // Fetch roles from JSON Server
  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:5000/roles');
      const data = await response.json();
      
      // Fetch permissions from your db.json
      const permissionsResponse = await fetch('http://localhost:5000/permissions');
      const permissionsData = await permissionsResponse.json();
  
      // Map permission IDs to permission details for each role
      const updatedRoles = data.map(role => {
        const permissions = role.permissions.map(permissionId => {
          return permissionsData.find(permission => permission.id === permissionId);
        });
        return { ...role, permissions };
      });
  
      setRoles(updatedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  

  // Handle input changes and auto-fill the module field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prev) => {
      const updatedRole = { ...prev, [name]: value };
      if (name === 'title') {
        updatedRole.module = value;  // Auto-fill the module field when the title changes
      }
      return updatedRole;
    });
  };

  // Save new or edited role
  const handleSaveRole = async () => {
    if (isEditing) {
      // Update the role in the backend
      await updateRole(currentRoleId, newRole);
    } else {
      // Add a new role to the backend
      await addRole(newRole);
    }
    setIsModalOpen(false);
    setNewRole({ title: '', module: '', description: '', permissions: [] });
    setIsEditing(false);
  };

  // Add a new role to the backend
  const addRole = async (role) => {
    try {
      const response = await fetch('http://localhost:5000/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });
      const newRole = await response.json();
      setRoles((prev) => [...prev, newRole]);
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  // Update an existing role in the backend
  const updateRole = async (id, updatedRole) => {
    try {
      const response = await fetch(`http://localhost:5000/roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRole),
      });
      const role = await response.json();
      setRoles((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...role } : r))
      );
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  // Delete a role from the backend
  const handleDeleteRole = async (id) => {
    try {
      await fetch(`http://localhost:5000/roles/${id}`, {
        method: 'DELETE',
      });
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  // Open the modal to add a new role
  const handleAddRole = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewRole({ title: '', module: '', description: '', permissions: [] });
  };

  // Open the modal to edit a role
  const handleEditRole = (role) => {
    setNewRole({ title: role.name, module: role.module, description: role.description, permissions: role.permissions });
    setIsEditing(true);
    setCurrentRoleId(role.id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
        <button
          onClick={handleAddRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions && role.permissions.length > 0 ? (
                    role.permissions.map((permission) => (
                      <span
                        key={permission.id}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                      >
                        {permission.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No permissions assigned</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing roles */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{isEditing ? 'Edit Role' : 'Add Role'}</h2>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={newRole.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="module" className="block text-sm font-medium text-gray-700">Module</label>
              <input
                id="module"
                name="module"
                type="text"
                value={newRole.module}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={newRole.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
