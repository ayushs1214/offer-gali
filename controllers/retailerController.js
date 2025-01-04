import { supabase } from '../config/supabase.js';

export const retailerController = {
  async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('retailers')
        .select('*')
        .order('name');

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { data, error } = await supabase
        .from('retailers')
        .select('*, deals(*)')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};