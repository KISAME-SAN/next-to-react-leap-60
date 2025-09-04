import { useEffect, useState } from "react";
import { Users, GraduationCap, User } from "lucide-react";
import { useClasses } from "@/hooks/useClasses";
import { useStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";

interface Stats {
  students: number;
  classes: number;
  teachers: number;
}

export default function Dashboard() {
  const { classes, loading: classesLoading } = useClasses();
  const { students, loading: studentsLoading } = useStudents();
  const { teachers, loading: teachersLoading } = useTeachers();
  
  const [stats, setStats] = useState<Stats>({ students: 0, classes: 0, teachers: 0 });

  useEffect(() => {
    document.title = "Dashboard — École Manager";
  }, []);

  useEffect(() => {
    // Mettre à jour les statistiques en temps réel
    setStats({
      students: students.length,
      classes: classes.length,
      teachers: teachers.length
    });
  }, [students.length, classes.length, teachers.length]);

  const isLoading = classesLoading || studentsLoading || teachersLoading;

  const cards = [
    { title: "Nombre d'Élèves", value: stats.students, icon: Users },
    { title: "Nombre de Classes", value: stats.classes, icon: GraduationCap },
    { title: "Nombre de Professeurs", value: stats.teachers, icon: User },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 animate-slide-up">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-card rounded-lg shadow-sm p-6 border border-border hover-lift animate-stagger">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-3xl font-bold">
                    {isLoading ? "..." : card.value}
                  </p>
                </div>
                <div className="bg-primary p-3 rounded-lg text-primary-foreground animate-float">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-lg shadow-sm p-6 border border-border hover-glow animate-slide-up" style={{animationDelay: '600ms'}}>
        <h2 className="text-xl font-semibold mb-4">Aperçu Récent</h2>
        <p className="text-muted-foreground">
          Bienvenue dans votre système de gestion scolaire. Utilisez le menu de gauche pour naviguer entre les différentes sections.
          {isLoading && " Chargement des données en cours..."}
        </p>
      </div>
    </div>
  );
}
