import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  hire_date: string;
  payment_type: 'fixe' | 'horaire';
  salary?: number;
  hourly_rate?: number;
  gender: 'homme' | 'femme';
  residence: string;
  contact_type: 'telephone' | 'email' | 'whatsapp' | 'sms';
  years_experience: number;
  nationality: string;
  emergency_contact: string;
  emergency_phone: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Charger les professeurs
  const fetchTeachers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching teachers:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les professeurs",
          variant: "destructive"
        });
        return;
      }

      setTeachers(data as Teacher[] || []);
    } catch (error) {
      console.error('Error in fetchTeachers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Créer un professeur
  const createTeacher = async (teacherData: Omit<Teacher, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('teachers')
        .insert({
          ...teacherData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating teacher:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'inscrire le professeur",
          variant: "destructive"
        });
        return false;
      }

      setTeachers(prev => [data as Teacher, ...prev]);
      toast({
        title: "Professeur inscrit",
        description: `${data.first_name} ${data.last_name} a été inscrit avec succès`
      });
      return true;
    } catch (error) {
      console.error('Error in createTeacher:', error);
      return false;
    }
  };

  // Mettre à jour un professeur
  const updateTeacher = async (id: string, updates: Partial<Omit<Teacher, 'id' | 'created_at' | 'user_id'>>) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating teacher:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier le professeur",
          variant: "destructive"
        });
        return false;
      }

      setTeachers(prev => prev.map(t => t.id === id ? data as Teacher : t));
      toast({
        title: "Professeur modifié",
        description: `${data.first_name} ${data.last_name} a été mis à jour`
      });
      return true;
    } catch (error) {
      console.error('Error in updateTeacher:', error);
      return false;
    }
  };

  // Supprimer un professeur
  const deleteTeacher = async (id: string) => {
    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting teacher:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le professeur",
          variant: "destructive"
        });
        return false;
      }

      setTeachers(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Professeur supprimé",
        description: "Le professeur a été supprimé avec succès"
      });
      return true;
    } catch (error) {
      console.error('Error in deleteTeacher:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTeachers();

      // Configurer le realtime
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'teachers'
          },
          (payload) => {
            console.log('Teachers realtime update:', payload);
            // Recharger les données sur changement
            fetchTeachers();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    teachers,
    loading,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    refetch: fetchTeachers
  };
};