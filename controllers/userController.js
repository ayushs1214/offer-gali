import { supabase } from '../config/supabase.js';

export const userController = {
  async register(req, res) {
    const { email, password, name } = req.body;
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw error;
      
      res.status(201).json({ message: 'User registered successfully', user: data.user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      res.json({ user: data.user, session: data.session });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async getProfile(req, res) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.user.id)
        .single();

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};