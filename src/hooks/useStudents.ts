import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  student_number?: string;
  parent_phone: string;
  gender: 'homme' | 'femme';
  class_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Charger les étudiants
  const fetchStudents = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching students:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les élèves",
          variant: "destructive"
        });
        return;
      }

      setStudents(data as Student[] || []);
    } catch (error) {
      console.error('Error in fetchStudents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Créer un étudiant
  const createStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          ...studentData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating student:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'inscrire l'élève",
          variant: "destructive"
        });
        return false;
      }

      setStudents(prev => [data as Student, ...prev]);
      toast({
        title: "Élève inscrit",
        description: `${data.first_name} ${data.last_name} a été inscrit avec succès`
      });
      return true;
    } catch (error) {
      console.error('Error in createStudent:', error);
      return false;
    }
  };

  // Mettre à jour un étudiant
  const updateStudent = async (id: string, updates: Partial<Omit<Student, 'id' | 'created_at' | 'user_id'>>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier l'élève",
          variant: "destructive"
        });
        return false;
      }

      setStudents(prev => prev.map(s => s.id === id ? data as Student : s));
      toast({
        title: "Élève modifié",
        description: `${data.first_name} ${data.last_name} a été mis à jour`
      });
      return true;
    } catch (error) {
      console.error('Error in updateStudent:', error);
      return false;
    }
  };

  // Supprimer un étudiant
  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting student:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'élève",
          variant: "destructive"
        });
        return false;
      }

      setStudents(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Élève supprimé",
        description: "L'élève a été supprimé avec succès"
      });
      return true;
    } catch (error) {
      console.error('Error in deleteStudent:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudents();

      // Configurer le realtime
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'students'
          },
          (payload) => {
            console.log('Students realtime update:', payload);
            // Recharger les données sur changement
            fetchStudents();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    students,
    loading,
    createStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents
  };
};