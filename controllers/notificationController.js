import { supabase } from '../config/supabase.js';

export const notificationController = {
  async getUserNotifications(req, res) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*, deals(title)')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async markAsRead(req, res) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', req.params.id)
        .eq('user_id', req.user.id)
        .select()
        .single();

      if (error) throw error;
      
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};