import { supabase } from '../config/supabase.js';

export const dealController = {
  async getAll(req, res) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*, retailers(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*, retailers(name)')
        .eq('id', req.params.id)
        .single();

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};