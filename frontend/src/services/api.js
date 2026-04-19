import axios from "axios";

// axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should NOT include /api
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- GROUPS ----------------
export const getGroups = () => API.get("/api/groups");
export const getGroupById = (id) => API.get(`/api/groups/${id}`);
export const createGroup = (group) => API.post("/api/groups", group);
export const updateGroup = (id, group) => API.put(`/api/groups/${id}`, group);
export const deleteGroup = (id) => API.delete(`/api/groups/${id}`);

// ---------------- MEMBERS ----------------
export const getMembers = () => API.get("/api/members");
export const getMemberById = (id) => API.get(`/api/members/${id}`);
export const createMember = (member) => API.post("/api/members", member);
export const updateMember = (id, member) => API.put(`/api/members/${id}`, member);
export const deleteMember = (id) => API.delete(`/api/members/${id}`);

export default API;