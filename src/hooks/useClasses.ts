import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Class {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Charger les classes
  const fetchClasses = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching classes:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les classes",
          variant: "destructive"
        });
        return;
      }

      setClasses(data || []);
    } catch (error) {
      console.error('Error in fetchClasses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Créer une classe
  const createClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('classes')
        .insert({
          ...classData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating class:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la classe",
          variant: "destructive"
        });
        return false;
      }

      setClasses(prev => [data, ...prev]);
      toast({
        title: "Classe créée",
        description: `${data.name} a été ajoutée avec succès`
      });
      return true;
    } catch (error) {
      console.error('Error in createClass:', error);
      return false;
    }
  };

  // Mettre à jour une classe
  const updateClass = async (id: string, updates: Partial<Omit<Class, 'id' | 'created_at' | 'user_id'>>) => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating class:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier la classe",
          variant: "destructive"
        });
        return false;
      }

      setClasses(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Classe modifiée",
        description: `${data.name} a été mise à jour`
      });
      return true;
    } catch (error) {
      console.error('Error in updateClass:', error);
      return false;
    }
  };

  // Supprimer une classe
  const deleteClass = async (id: string) => {
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting class:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la classe",
          variant: "destructive"
        });
        return false;
      }

      setClasses(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Classe supprimée",
        description: "La classe a été supprimée avec succès"
      });
      return true;
    } catch (error) {
      console.error('Error in deleteClass:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();

      // Configurer le realtime
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'classes'
          },
          (payload) => {
            console.log('Classes realtime update:', payload);
            // Recharger les données sur changement
            fetchClasses();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    classes,
    loading,
    createClass,
    updateClass,
    deleteClass,
    refetch: fetchClasses
  };
};