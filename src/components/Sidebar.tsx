import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  UserPlus,
  Users,
  GraduationCap,
  BarChart3,
  CalendarDays,
  Euro,
  UserCheck,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export default function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home, url: "/dashboard" },
    { id: "student-registration", label: "Inscription des Élèves", icon: UserPlus, url: "/dashboard/students/register" },
    { id: "student-management", label: "Gestion des Élèves", icon: Users, url: "/dashboard/students" },
    { id: "teacher-registration", label: "Inscription des Professeurs", icon: BarChart3, url: "/dashboard/teachers/register" },
    { id: "teacher-management", label: "Gestion des Professeurs", icon: BarChart3, url: "/dashboard/teachers" },
    { id: "class-management", label: "Gestion des Classes", icon: GraduationCap, url: "/dashboard/classes" },
    { id: "grades-management", label: "Gestion des Notes", icon: BarChart3, url: "/dashboard/grades" },
    { id: "schedule-management", label: "Gestion des Emplois du Temps", icon: CalendarDays, url: "/dashboard/schedule" },
    { id: "attendance-management", label: "Gestion des Présences", icon: UserCheck, url: "/dashboard/attendance" },
    { id: "payment-management", label: "Gestion des Paiements", icon: Euro, url: "/dashboard/payments" },
    { id: "payment-pay", label: "Verser un paiement", icon: CreditCard, url: "/dashboard/payments/students/pay" },
  ];

  const navCls = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center px-6 py-3 text-left transition-colors duration-200 border-r ${
      isActive
        ? "bg-muted text-primary border-primary"
        : "text-muted-foreground hover:bg-muted/50 border-transparent"
    }`;

  return (
    <aside aria-hidden={collapsed} className={`h-screen ${collapsed ? "w-0 border-transparent" : "w-64 border-border"} flex-shrink-0 bg-card border-r flex flex-col overflow-hidden transition-all duration-300`}>
      <div className="p-6 border-b border-border flex-shrink-0">
        <h1 className="text-2xl font-bold">École Manager</h1>
        <p className="text-sm text-muted-foreground mt-1">Gestion Scolaire</p>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.id} to={item.url} end className={navCls}>
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Section utilisateur */}
      <div className="border-t border-border p-4 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || user?.email || 'Utilisateur'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.position || 'Administrateur'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </aside>
  );
}
