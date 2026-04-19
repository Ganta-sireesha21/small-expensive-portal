import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api"
});
export const getGroups = () => API.get("/groups");
export const getGroupById = (id) => API.get(`/groups/${id}`);
export const createGroup = (group) => API.post("/groups", group);
export const updateGroup = (id, group) => API.put(`/groups/${id}`, group);
export const deleteGroup = (id) => API.delete(`/groups/${id}`);

export const getMembers = () => API.get("/members");
export const getMemberById = (id) => API.get(`/members/${id}`);
export const createMember = (member) => API.post("/members", member);
export const updateMember = (id, member) => API.put(`/members/${id}`, member);
export const deleteMember = (id) => API.delete(`/members/${id}`);
// export default API;