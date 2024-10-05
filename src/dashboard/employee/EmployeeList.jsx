import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({ name: '', email: '', role: '' });

  const fetchEmployees = async () => {
    try {
      const data = await getUsers();
      setEmployees(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      toast.error(error.message || 'Failed to delete employee');
    }
  };

  const handleEditToggle = (employee) => {
    if (editingId === employee.id) {
      handleUpdate(employee.id);
    } else {
      setEditingId(employee.id);
      setEditedEmployee(employee);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser(id, editedEmployee);
      toast.success('Employee updated successfully');
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      toast.error(error.message || 'Failed to update employee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      <ToastContainer />
      <div className="flex flex-col space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
            {editingId === employee.id ? (
              // Inline editing mode
              <>
                <div className="flex-grow mr-4">
                  <input
                    type="text"
                    name="name"
                    value={editedEmployee.name}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedEmployee.email}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="role"
                    value={editedEmployee.role}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full"
                    placeholder="Role"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(employee.id)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              // Viewing mode
              <>
                <div className="flex-grow mr-4">
                  <h3 className="text-lg font-bold">{employee.name}</h3>
                  <p className="text-gray-600">{employee.email}</p>
                  <p className="text-gray-500">{employee.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditToggle(employee)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5 inline-block" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;