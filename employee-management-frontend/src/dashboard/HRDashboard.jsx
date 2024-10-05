import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getLeaves } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEmployeesAndLeaves = async () => {
      try {
        const employeeData = await getUsers(); // Fetch users
        setEmployees(employeeData);
        const leaveData = await getLeaves(); // Fetch leaves
        setLeaves(leaveData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data.');
      }
    };
    fetchEmployeesAndLeaves();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddOrEditEmployee = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(formData.id, formData); // Update user with ID
        toast.success('Employee updated successfully!');
      } else {
        await createUser(formData); // Create new user
        toast.success('Employee added successfully!');
      }

      setFormData({ id: '', name: '', email: '', role: '' });
      setIsEditing(false);
      setEmployees(await getUsers()); // Refresh the employee list

    } catch (error) {
      toast.error('Error occurred while saving the employee.');
      console.error('Error adding/updating employee:', error);
    }
  };

  const handleEditClick = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteUser(id); // Delete user by ID
      toast.success('Employee deleted successfully!');
      setEmployees(await getUsers()); // Refresh the employee list
    } catch (error) {
      toast.error('Error deleting employee.');
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      
      {/* Employee Form */}
      <form onSubmit={handleAddOrEditEmployee} className="mb-6">
        <input type='hidden' name='id' value={formData.id} />
        <input type='text' name='name' placeholder='Employee Name' value={formData.name} onChange={handleInputChange} required className="border p-2 mr-2" />
        <input type='email' name='email' placeholder='Employee Email' value={formData.email} onChange={handleInputChange} required className="border p-2 mr-2" />
        <select name='role' value={formData.role} onChange={handleInputChange} required className="border p-2 mr-2">
          <option value=''>Select Role</option>
          <option value='employee'>Employee</option>
          <option value='hr'>HR</option>
        </select>
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      {/* Employees List */}
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {employees.map(employee => (
          <div key={employee.id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-semibold text-lg">{employee.name}</h3>
            <p>{employee.email}</p>
            <p>{employee.role}</p>
            <div className="flex justify-between mt-auto">
              <AiFillEdit onClick={() => handleEditClick(employee)} className="text-blue-500 cursor-pointer" />
              <AiFillDelete onClick={() => handleDeleteClick(employee.id)} className="text-red-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Leaves List */}
      <h2 className="text-xl font-bold mt-8 mb-4">Leave Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {leaves.map(leave =>{
const  employeeName = employees.find(employee => employee.id === leave.employeeId)?.name; 
leave.employeeName = employeeName|| 'Unknown Employee';  
const  employeeType = employees.find(employee => employee.id === leave.employeeId)?.role; 
leave.employeeType = employeeType|| 'Unknown ';
console.log(`Leave ID: ${leave.id}, Employee ID: ${leave.employeeId}, Employee Name: ${employeeName}`); 

        
        return (
         
          <div key={leave.id} className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-semibold text-lg"> Employee Name : {leave.employeeName}</h3> {/* Adjust according to your leave data structure */}
            <p>Type: {leave.employeeType}</p> {/* Adjust according to your leave data structure */}
            <p>Start Date: {new Date(leave.startDate).toLocaleDateString()}</p> {/* Adjust according to your leave data structure */}
            <p>End Date: {new Date(leave.endDate).toLocaleDateString()}</p> {/* Adjust according to your leave data structure */}
            <p>Status: {leave.status}</p> {/* Adjust according to your leave data structure */}
          </div>

      
);
        })}
      </div>
     </>
   );
};