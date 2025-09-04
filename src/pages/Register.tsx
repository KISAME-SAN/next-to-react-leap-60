import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  schoolName: z.string().min(2, "Le nom de l'établissement est requis"),
  schoolType: z.string().min(1, "Le type d'établissement est requis"),
  position: z.string().min(1, "Votre fonction est requise"),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");

    try {
      const registerData = {
        email: data.email,
        password: data.password,
        fullName: `${data.firstName} ${data.lastName}`,
        schoolName: data.schoolName,
        schoolType: data.schoolType,
        position: data.position,
        phone: data.phone,
      };

      const success = await registerUser(registerData);
      
      if (success) {
        toast({
          title: "Compte créé avec succès !",
          description: "Vérifiez votre email pour confirmer votre compte.",
        });
        
        navigate("/login");
      } else {
        setError("Une erreur est survenue lors de la création du compte");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la création du compte");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Créer votre compte</h1>
          <p className="text-muted-foreground mt-2">
            Commencez votre essai gratuit de 14 jours
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour créer votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="Jean"
                      className="pl-10"
                      {...register("firstName")}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    placeholder="Dupont"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@ecole.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  {...register("phone")}
                />
              </div>

              {/* Informations établissement */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4 text-lg">Informations sur l'établissement</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Nom de l'établissement *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="schoolName"
                        placeholder="Lycée Victor Hugo"
                        className="pl-10"
                        {...register("schoolName")}
                      />
                    </div>
                    {errors.schoolName && (
                      <p className="text-sm text-destructive">{errors.schoolName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolType">Type d'établissement *</Label>
                      <Select onValueChange={(value) => setValue("schoolType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecole-primaire">École Primaire</SelectItem>
                          <SelectItem value="college">Collège</SelectItem>
                          <SelectItem value="lycee">Lycée</SelectItem>
                          <SelectItem value="universite">Université</SelectItem>
                          <SelectItem value="ecole-privee">École Privée</SelectItem>
                          <SelectItem value="centre-formation">Centre de Formation</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.schoolType && (
                        <p className="text-sm text-destructive">{errors.schoolType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Votre fonction *</Label>
                      <Select onValueChange={(value) => setValue("position", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="directeur">Directeur/Directrice</SelectItem>
                          <SelectItem value="principal">Principal/Principale</SelectItem>
                          <SelectItem value="administrateur">Administrateur</SelectItem>
                          <SelectItem value="secretaire">Secrétaire</SelectItem>
                          <SelectItem value="enseignant">Enseignant</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.position && (
                        <p className="text-sm text-destructive">{errors.position.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mot de passe */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4 text-lg">Sécurité du compte</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  {...register("acceptTerms")}
                />
                <div className="text-sm text-muted-foreground">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </div>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Déjà un compte ?
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avantages de l'inscription */}
        <Card className="mt-4 border-dashed bg-primary/5">
          <CardContent className="pt-4">
            <h4 className="font-semibold mb-2 text-center">🎉 Votre essai gratuit inclut :</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Accès complet à toutes les fonctionnalités</li>
              <li>✅ Support technique par email</li>
              <li>✅ Aucun engagement de durée</li>
              <li>✅ Configuration guidée incluse</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
