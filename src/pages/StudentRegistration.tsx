import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useClasses } from "@/hooks/useClasses";
import { useStudents } from "@/hooks/useStudents";
import { useToast } from "@/hooks/use-toast";

interface StudentFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  studentNumber?: string;
  parentPhone: string;
  gender: "homme" | "femme";
  classId: string;
}

export default function StudentRegistration() {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    studentNumber: "",
    parentPhone: "",
    gender: "homme",
    classId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { classes, loading: classesLoading } = useClasses();
  const { createStudent } = useStudents();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Inscription Élève — École Manager";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate ||
      !formData.birthPlace ||
      !formData.parentPhone ||
      !formData.classId
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await createStudent({
        first_name: formData.firstName,
        last_name: formData.lastName,
        birth_date: formData.birthDate,
        birth_place: formData.birthPlace,
        student_number: formData.studentNumber || undefined,
        parent_phone: formData.parentPhone,
        gender: formData.gender,
        class_id: formData.classId,
      });

      if (success) {
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          birthPlace: "",
          studentNumber: "",
          parentPhone: "",
          gender: "homme",
          classId: "",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Inscription des Élèves</h1>

        <div className="bg-card rounded-lg shadow-sm p-8 border border-border hover-glow">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Prénom *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Date de Naissance *</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lieu de Naissance *</label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Numéro de l'Élève (optionnel)</label>
              <input
                type="text"
                value={formData.studentNumber}
                onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone Parent/Tuteur *</label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Genre *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "homme" | "femme" })}
                  className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                  required
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Classe *</label>
              <select
                value={formData.classId}
                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                required
              >
                <option value="">Sélectionner une classe</option>
                {classesLoading ? (
                  <option disabled>Chargement...</option>
                ) : (
                  classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || classesLoading}>
              {isSubmitting ? "Inscription en cours..." : "✨ Inscrire l'Élève"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
