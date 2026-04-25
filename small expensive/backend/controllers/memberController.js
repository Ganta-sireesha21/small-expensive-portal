import supabase from "../services/supabaseClient.js";
export const createMember = async (req, res) => {
    try {
    const { name,  group_id } = req.body;
    console.log("REQ BODY:", req.body);
    if (!name || !group_id) {
      return res.status(400).json({ error: "Name and group_id required" });
    }

    const { data, error } = await supabase
        .from('members')
        .insert([{ name, group_id }])   
        .select()
        .single();
    if (error) {
        console.error("Supabase Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
}
catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
export const getMembers = async (req, res) => {
    const { groupId } = req.params;
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('group_id', groupId);   
    if (error) {
        return res.status(500).json({ error: error.message });
    }   
    res.status(200).json(data);
};
export const getMemberById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', id)
        // .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};
export const updateMember = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { data, error } = await supabase
        .from('members')
        .update({ name })
        .eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};
export const deleteMember = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};
