import supabase from "../services/supabaseClient.js";
export const createGroup = async (req, res) => {
    try {
        console.log("Received request to create group with body:", req.body);
    const { name } = req.body;
    const { data, error } = await supabase
        .from('groups')
        .insert([{ name }]);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getGroups = async (req, res) => {
    const { data, error } = await supabase
        .from('groups')
        .select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};
export const getGroupById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase  
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        return res.status(500).json({ error: error.message });
    }       
    res.status(200).json(data);
};
export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body; 
    const { data, error } = await supabase
        .from('groups')
        .update({ name, description })
        .eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }   
    res.status(200).json(data);
};
export const deleteGroup = async (req, res) => {
    const { id } = req.params;  
    const { data, error } = await supabase
        .from('groups')
        .delete()
        .eq('id', id);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};

