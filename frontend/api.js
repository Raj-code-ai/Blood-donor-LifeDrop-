const API_URL = 'http://localhost:5000/api';

// ========== Helper Functions ==========

// Store token
const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Get token
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Remove token
const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// ========== Authentication Functions ==========

// Register User
const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.success) {
      saveToken(data.token);
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Registration failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Login User
const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      saveToken(data.token);
      return { success: true, data };
    }
    return { success: false, error: data.message || 'Login failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout User
const logoutUser = () => {
  removeToken();
  window.location.href = 'index.html';
};

// Get Current User
const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// ========== Donor Functions ==========

// Register as Donor
const registerAsDonor = async (donorData) => {
  try {
    const response = await fetch(`${API_URL}/donors/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(donorData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get All Donors
const getAllDonors = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/donors?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Search Donors
const searchDonors = async (bloodGroup = '', city = '', availability = '') => {
  try {
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);
    if (availability) params.append('availability', availability);

    const response = await fetch(`${API_URL}/donors/search?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get Donor by ID
const getDonorById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/donors/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ========== Blood Request Functions ==========

// Create Blood Request
const createBloodRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get All Blood Requests
const getAllBloodRequests = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Search Blood Requests
const searchBloodRequests = async (bloodGroup = '', city = '', urgency = '') => {
  try {
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (city) params.append('city', city);
    if (urgency) params.append('urgency', urgency);

    const response = await fetch(`${API_URL}/blood-requests/search?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get Blood Request by ID
const getBloodRequestById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Accept Blood Request
const acceptBloodRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests/${requestId}/accept`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Fulfill Blood Request
const fulfillBloodRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests/${requestId}/fulfill`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cancel Blood Request
const cancelBloodRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/blood-requests/${requestId}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
