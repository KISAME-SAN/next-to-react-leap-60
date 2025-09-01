import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BarChart3,
  CalendarDays,
  Euro,
  UserCheck,
  CheckCircle,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: "Gestion des Élèves",
      description: "Inscription, suivi académique et gestion complète des dossiers étudiants"
    },
    {
      icon: GraduationCap,
      title: "Gestion des Classes",
      description: "Organisation des classes, attribution des enseignants et planning des cours"
    },
    {
      icon: BarChart3,
      title: "Suivi des Notes",
      description: "Saisie des notes, calcul des moyennes et génération de bulletins automatiques"
    },
    {
      icon: CalendarDays,
      title: "Emplois du Temps",
      description: "Planification intelligente des cours et gestion des créneaux horaires"
    },
    {
      icon: Euro,
      title: "Gestion Financière",
      description: "Suivi des paiements, facturation et gestion des frais scolaires"
    },
    {
      icon: UserCheck,
      title: "Présences",
      description: "Suivi des absences en temps réel pour élèves et enseignants"
    }
  ];

  const benefits = [
    "Interface moderne et intuitive",
    "Synchronisation en temps réel",
    "Rapports détaillés automatiques",
    "Support multilingue",
    "Sécurité renforcée des données",
    "Support technique 24/7"
  ];

  const plans = [
    {
      name: "Starter",
      price: "29€",
      period: "/mois",
      description: "Parfait pour les petites écoles",
      features: [
        "Jusqu'à 100 élèves",
        "5 enseignants",
        "Gestion des notes",
        "Support email"
      ]
    },
    {
      name: "Professional",
      price: "79€",
      period: "/mois",
      description: "Idéal pour les établissements moyens",
      features: [
        "Jusqu'à 500 élèves",
        "25 enseignants",
        "Toutes les fonctionnalités",
        "Support prioritaire",
        "Rapports avancés"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "149€",
      period: "/mois",
      description: "Pour les grands établissements",
      features: [
        "Élèves illimités",
        "Enseignants illimités",
        "API personnalisée",
        "Support dédié",
        "Formation incluse"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice, Lycée Saint-Martin",
      content: "École Manager a révolutionné notre gestion administrative. Un gain de temps considérable !",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Principal, Collège Victor Hugo",
      content: "Interface intuitive et fonctionnalités complètes. Nos enseignants adorent !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              La Solution de{" "}
              <span className="text-primary">Gestion Scolaire</span>{" "}
              du Futur
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '200ms'}}>
              Simplifiez la gestion de votre établissement avec notre plateforme tout-en-un. 
              Élèves, enseignants, notes, paiements - tout en un seul endroit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '400ms'}}>
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/register">
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/login">Se Connecter</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 animate-slide-up" style={{animationDelay: '600ms'}}>
              Essai gratuit de 14 jours • Sans engagement • Installation rapide
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une suite complète d'outils pour digitaliser et optimiser la gestion de votre établissement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-lift animate-stagger border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir École Manager ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre plateforme a été spécialement conçue pour répondre aux besoins modernes 
                des établissements scolaires de toutes tailles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100% Sécurisé</h3>
                <p className="text-sm text-muted-foreground">Données chiffrées et conformité RGPD</p>
              </Card>
              <Card className="p-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Ultra Rapide</h3>
                <p className="text-sm text-muted-foreground">Performance optimisée pour tous les appareils</p>
              </Card>
              <Card className="p-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Accessible Partout</h3>
                <p className="text-sm text-muted-foreground">Application web responsive</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Multi-utilisateurs</h3>
                <p className="text-sm text-muted-foreground">Gestion des rôles et permissions</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tarifs Transparents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez le plan qui correspond à la taille de votre établissement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover-lift ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                    <Link to="/register">Commencer</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez ce que disent nos utilisateurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à transformer votre établissement ?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'établissements qui ont déjà fait le choix de l'innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/register">
                Essai Gratuit 14 Jours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/login">Démonstration</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
