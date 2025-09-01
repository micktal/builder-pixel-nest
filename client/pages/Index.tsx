import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import React from "react";
import StressEvolutionSection from "@/components/StressEvolutionSection";
import StressSelfAssessmentSection from "@/components/StressSelfAssessment";
import DidYouKnow from "@/components/DidYouKnow";
import FactTrigger from "@/components/FactTrigger";
import ScientificFacts from "@/components/ScientificFacts";
import BreathingExercise from "@/components/BreathingExercise";
import RelaxationTechniques from "@/components/RelaxationTechniques";
import EarlyWarningSigns from "@/components/EarlyWarningSigns";
import ProgressTracker from "@/components/ProgressTracker";
import {
  BookOpen,
  Users,
  Award,
  Zap,
  Globe,
  Headphones,
  Play,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Check,
  X,
  RotateCcw,
  Activity,
  Heart,
  RefreshCw,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Info,
  Brain,
  Shield,
  Droplet,
  Wind,
  Timer,
  ExternalLink,
  Target,
} from "lucide-react";

export default function Index() {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Navigation entre les sections
  const navigateToSection = (sectionId: string) => {
    // Sauvegarder la position de scroll actuelle
    setScrollPosition(window.scrollY);
    setCurrentSection(sectionId);
  };

  const backToMain = () => {
    setCurrentSection(null);
  };

  // Restaurer la position de scroll quand on revient au module principal
  useEffect(() => {
    if (currentSection === null && scrollPosition > 0) {
      // Petit délai pour s'assurer que le DOM est rendu
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [currentSection, scrollPosition]);

  // Si on est dans une section spécifique, l'afficher
  if (currentSection === 'breathing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Exercices de respiration</h1>
              <Button onClick={backToMain} variant="outline">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Retour au module
              </Button>
            </div>
          </div>
        </div>
        <BreathingExercise />
      </div>
    );
  }

  if (currentSection === 'relaxation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Techniques de relaxation</h1>
              <Button onClick={backToMain} variant="outline">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Retour au module
              </Button>
            </div>
          </div>
        </div>
        <RelaxationTechniques />
      </div>
    );
  }

  if (currentSection === 'signals') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Détection des signaux d'alarme</h1>
              <Button onClick={backToMain} variant="outline">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Retour au module
              </Button>
            </div>
          </div>
        </div>
        <EarlyWarningSigns />
      </div>
    );
  }

  if (currentSection === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Suivi de progression</h1>
              <Button onClick={backToMain} variant="outline">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Retour au module
              </Button>
            </div>
          </div>
        </div>
        <ProgressTracker />
      </div>
    );
  }

  const features = [
    {
      icon: Shield,
      title: "Une réaction d'adaptation",
      description:
        "Contrairement à une idée reçue, le stress n'est pas toujours négatif. Il s'agit d'un mécanisme d'adaptation hérité de l'évolution : notre corps prépare une réponse rapide face à un danger ou un défi, mobilisant l'énergie nécessaire pour agir.",
    },
    {
      icon: Timer,
      title: "Stress aigu vs stress chronique",
      description:
        "On distingue le stress aigu, ponctuel et souvent bénéfique (présentation importante, gestion d'une urgence), et le stress chronique, prolongé et délétère, qui épuise l'organisme et altère la santé mentale et physique.",
    },
    {
      icon: ExternalLink,
      title: "Les déclencheurs externes",
      description:
        "Le stress peut provenir de stimuli extérieurs : surcharge de travail, interruptions constantes, conflits interpersonnels, imprévus techniques, délais serrés… Ces déclencheurs activent la réponse de stress, parfois même avant que nous en ayons pleinement conscience.",
    },
    {
      icon: Brain,
      title: "Les facteurs internes",
      description:
        "Nos pensées, croyances et traits de personnalité jouent un rôle important. Le perfectionnisme, la peur de l'erreur, la faible tolérance à l'incertitude ou encore une faible perception de contrôle peuvent amplifier la réaction de stress, même face à des situations relativement neutres.",
    },
    {
      icon: Heart,
      title: "Les réactions physiologiques",
      description:
        "Lorsqu'une situation est perçue comme stressante, le cerveau déclenche la s��crétion d'hormones comme l'adrénaline et le cortisol. Ces substances augmentent la fréquence cardiaque, la tension artérielle et mobilisent les réserves d'énergie. Si cette activation perdure, elle devient nocive.",
    },
    {
      icon: AlertTriangle,
      title: "Les signaux d'alerte",
      description:
        "Le stress se manifeste par des signaux physiques (tensions musculaires, fatigue), émotionnels (irritabilité, anxiété), cognitifs (trous de mémoire, difficultés de concentration) et comportementaux (procrastination, isolement). Les identifier tôt permet d'agir avant que la situation ne s'aggrave.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                <span style={{color: "rgb(144, 19, 254)"}}>Module 1 –</span>{" "}
                <span style={{color: "rgb(144, 19, 254)"}}>
                  Comprendre le stress
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Le stress est un signal, pas une condamnation. Apprenez à
                l'écouter avant qu'il ne crie.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/9162030/pexels-photo-9162030.jpeg"
                alt="Illustration cerveau et cœur symbolisant logique et émotion"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction au stress Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Introduction au stress
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Le stress est une réaction universelle que chacun expérimente,
                  qu'il soit sur le terrain, en bureau ou en management. Il ne
                  s'agit pas seulement d'une émotion, mais d'un ensemble de réponses
                  physiologiques, cognitives et comportementales que notre organisme
                  met en place lorsqu'il perçoit une situation comme exigeante ou
                  menaçante.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg"
                  alt="Femme stressée et surmenée à son bureau en télétravail"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outils pratiques Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Outils pratiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Passez de la théorie à la pratique avec nos outils interactifs de gestion du stress
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Exercices de respiration */}
            <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl group cursor-pointer" onClick={() => navigateToSection('breathing')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Respiration guidée</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  4 techniques interactives avec timer visuel pour maîtriser votre respiration.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="outline" className="text-xs">Respiration carrée</Badge>
                  <Badge variant="outline" className="text-xs">Cohérence cardiaque</Badge>
                  <Badge variant="outline" className="text-xs">4-7-8</Badge>
                </div>
                <Button className="w-full group-hover:bg-blue-600" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Commencer
                </Button>
              </CardContent>
            </Card>

            {/* Gestion du temps et priorités */}
            <Card className="border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl group cursor-pointer" onClick={() => navigateToSection('timemanagement')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Gestion du temps</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Outils et techniques pour organiser vos priorités et réduire la surcharge.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="outline" className="text-xs">Matrice d'Eisenhower</Badge>
                  <Badge variant="outline" className="text-xs">Pomodoro</Badge>
                  <Badge variant="outline" className="text-xs">Planning anti-stress</Badge>
                </div>
                <Button className="w-full group-hover:bg-purple-600" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Organiser
                </Button>
              </CardContent>
            </Card>

            {/* Détection des signaux */}
            <Card className="border-2 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl group cursor-pointer" onClick={() => navigateToSection('signals')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Signaux d'alarme</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Apprenez à détecter vos signaux personnels de stress en amont.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="outline" className="text-xs">Auto-évaluation</Badge>
                  <Badge variant="outline" className="text-xs">Suivi quotidien</Badge>
                  <Badge variant="outline" className="text-xs">Plan d'action</Badge>
                </div>
                <Button className="w-full group-hover:bg-orange-600" size="sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Découvrir
                </Button>
              </CardContent>
            </Card>

            {/* Suivi de progression */}
            <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-2xl group cursor-pointer" onClick={() => navigateToSection('progress')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Ma progression</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Suivez vos progrès, définissez des objectifs et célébrez vos succès.
                </p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  <Badge variant="outline" className="text-xs">Statistiques</Badge>
                  <Badge variant="outline" className="text-xs">Objectifs</Badge>
                  <Badge variant="outline" className="text-xs">Succès</Badge>
                </div>
                <Button className="w-full group-hover:bg-green-600" size="sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Accéder
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Appel à l'action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Prêt à maîtriser votre stress ?</h3>
                <p className="text-indigo-100 mb-6">
                  Commencez par identifier vos signaux personnels, puis pratiquez les techniques qui vous conviennent le mieux.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => navigateToSection('signals')}
                    variant="outline"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 border-white"
                  >
                    1. Identifier mes signaux
                  </Button>
                  <Button
                    onClick={() => navigateToSection('breathing')}
                    variant="outline"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 border-white"
                  >
                    2. Pratiquer la respiration
                  </Button>
                  <Button
                    onClick={() => navigateToSection('progress')}
                    variant="outline"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 border-white"
                  >
                    3. Suivre mes progrès
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-8">
              <img
                src="https://images.pexels.com/photos/17483868/pexels-photo-17483868.jpeg"
                alt="Cerveau numérique 3D avec couleurs vibrantes"
                className="w-32 h-20 object-cover rounded-lg mx-auto shadow-lg"
              />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ce qui compte, ce n'est pas ce qui vous arrive, mais comment vous
              y répondez
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flashcards Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <img
                src="https://images.pexels.com/photos/33675857/pexels-photo-33675857.jpeg"
                alt="Formation de yoga en Thaïlande - 300 heures"
                className="w-24 h-16 object-cover rounded-lg mx-auto shadow-lg"
              />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Flashcards — Aigu vs Chronique
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Stress Aigu Card */}
            <Card className="bg-white border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700">
                  Stress Aigu
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Caractéristiques :
                  </h3>
                  <ul className="text-green-700 text-sm space-y-1 text-left">
                    <li>• Court terme et ponctuel</li>
                    <li>• Réaction normale et adaptative</li>
                    <li>• Mobilise les ressources</li>
                    <li>• Améliore les performances</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Exemples :
                  </h3>
                  <p className="text-green-700 text-sm text-left">
                    Présentation importante, entretien d'embauche, gestion
                    d'urgence, examen médical, échéance serrée
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stress Chronique Card */}
            <Card className="bg-white border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-700">
                  Stress Chronique
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Caractéristiques :
                  </h3>
                  <ul className="text-red-700 text-sm space-y-1 text-left">
                    <li>• Long terme et persistant</li>
                    <li>• Épuise les ressources</li>
                    <li>• Altère la santé physique et mentale</li>
                    <li>• Diminue les performances</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Conséquences :
                  </h3>
                  <p className="text-red-700 text-sm text-left">
                    Burnout, troubles du sommeil, anxiété, dépression, problèmes
                    cardiovasculaires, affaiblissement immunitaire
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scientific Facts Section */}
      <ScientificFacts />

      {/* Quiz Section */}
      <QuizSection navigateToSection={navigateToSection} />

      {/* Appel à l'action après quiz */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">
              Maintenant, passons à la pratique !
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Vous avez acquis les connaissances théoriques. Il est temps d'apprendre les techniques concrètes de gestion du stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigateToSection('breathing')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-0"
              >
                <Wind className="w-5 h-5 mr-2" />
                Exercices de respiration
              </Button>
              <Button
                onClick={() => navigateToSection('relaxation')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 border-0"
              >
                <Brain className="w-5 h-5 mr-2" />
                Techniques de relaxation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Micro-cas pratiques Section */}
      <MicroCasesSection />

      {/* Evolution du stress Section */}
      <StressEvolutionSection />

      {/* Self Assessment Section */}
      <StressSelfAssessmentSection />

      {/* Section finale - Votre parcours personnalisé */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Créez votre parcours personnalisé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Maintenant que vous avez les clés, définissez votre stratégie personnelle de gestion du stress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Étape 1 */}
            <Card className="text-center border-2 border-orange-200 hover:border-orange-300 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <CardTitle className="text-xl text-gray-900">Identifiez vos signaux</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Découvrez vos signaux d'alarme personnels et créez votre système de détection précoce.
                </p>
                <Button
                  onClick={() => navigateToSection('signals')}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Commencer l'évaluation
                </Button>
              </CardContent>
            </Card>

            {/* Étape 2 */}
            <Card className="text-center border-2 border-blue-200 hover:border-blue-300 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-xl text-gray-900">Pratiquez les techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Maîtrisez les techniques de respiration et de relaxation qui vous conviennent.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigateToSection('breathing')}
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Wind className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => navigateToSection('relaxation')}
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <Brain className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Étape 3 */}
            <Card className="text-center border-2 border-green-200 hover:border-green-300 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <CardTitle className="text-xl text-gray-900">Suivez vos progrès</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Définissez des objectifs, suivez vos progrès et célébrez vos succès.
                </p>
                <Button
                  onClick={() => navigateToSection('progress')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Accéder au suivi
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Encouragement final */}
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Votre voyage vers la maîtrise du stress commence maintenant
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Rappelez-vous : chaque petit pas compte. La régularité dans la pratique est plus importante que la durée.
                Commencez dès aujourd'hui, même avec 2 minutes par jour.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigateToSection('breathing')}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 border-0"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Commencer maintenant
                </Button>
                <Button
                  onClick={() => navigateToSection('progress')}
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-400 border-0"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Voir tous les outils
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Module 1 - Comprendre le stress</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Un parcours complet pour maîtriser les fondamentaux du stress et acquérir des techniques pratiques de gestion.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Outils pratiques</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigateToSection('breathing')}
                  className="block text-gray-300 hover:text-white text-sm transition-colors"
                >
                  • Exercices de respiration
                </button>
                <button
                  onClick={() => navigateToSection('relaxation')}
                  className="block text-gray-300 hover:text-white text-sm transition-colors"
                >
                  • Techniques de relaxation
                </button>
                <button
                  onClick={() => navigateToSection('signals')}
                  className="block text-gray-300 hover:text-white text-sm transition-colors"
                >
                  • Détection des signaux
                </button>
                <button
                  onClick={() => navigateToSection('progress')}
                  className="block text-gray-300 hover:text-white text-sm transition-colors"
                >
                  • Suivi de progression
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contenu théorique</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Mécanismes du stress</p>
                <p>• Signaux d'alarme</p>
                <p>• Faits scientifiques</p>
                <p>• Quiz interactif</p>
                <p>• Micro-cas pratiques</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-lg font-semibold mb-2">Module 1 - Comprendre le stress | FPSG 2025</p>
            <p className="text-gray-400 text-sm">
              Formation complète avec outils interactifs pour la maîtrise du stress professionnel
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuizSection({ navigateToSection }: { navigateToSection: (section: string) => void }) {
  const questions = [
    // Questions théoriques de base
    {
      id: 1,
      type: "true-false",
      question: "Le stress est toujours néfaste pour l'organisme.",
      answer: false,
      explanation:
        "Faux. Le stress aigu peut être bénéfique et améliorer les performances. C'est le stress chronique qui devient délétère.",
      practicalTip: "Apprenez à distinguer stress aigu et chronique pour mieux gérer vos réactions."
    },
    {
      id: 2,
      type: "true-false",
      question: "Le stress chronique épuise les ressources de l'organisme.",
      answer: true,
      explanation:
        "Vrai. Le stress prolongé maintient l'organisme en état d'alerte constant, ce qui épuise ses réserves énergétiques.",
      practicalTip: "Intégrez des moments de récupération réguliers dans votre quotidien."
    },
    {
      id: 3,
      type: "true-false",
      question: "Les signaux d'alerte du stress sont uniquement physiques.",
      answer: false,
      explanation:
        "Faux. Le stress se manifeste par des signaux physiques, émotionnels, cognitifs et comportementaux.",
      practicalTip: "Développez votre conscience de tous les types de signaux pour une détection précoce."
    },

    // Questions pratiques sur les techniques de respiration
    {
      id: 4,
      type: "multiple-choice",
      question: "Quelle est la technique de respiration la plus adaptée pour se calmer rapidement avant un entretien ?",
      options: [
        "Respiration rapide et superficielle",
        "Respiration carrée (4-4-4-4)",
        "Retenir sa respiration le plus longtemps possible",
        "Respirer uniquement par la bouche"
      ],
      correctAnswer: 1,
      explanation:
        "La respiration carrée (4 secondes d'inspiration, 4 de rétention, 4 d'expiration, 4 de pause) est idéale pour retrouver rapidement son calme car elle régule le système nerveux.",
      practicalTip: "Pratiquez cette technique 2-3 minutes avant toute situation stressante prévue."
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Vous ressentez une montée d'anxiété au travail. Quelle est la meilleure stratégie immédiate ?",
      options: [
        "Ignorer la sensation et continuer à travailler",
        "Prendre 3 respirations profondes et identifier la cause",
        "Quitter immédiatement le bureau",
        "Boire plusieurs cafés pour se concentrer"
      ],
      correctAnswer: 1,
      explanation:
        "Prendre quelques respirations profondes permet de réguler le système nerveux, puis identifier la cause aide à choisir la bonne stratégie d'adaptation.",
      practicalTip: "Cette pause consciente de 30 secondes peut transformer votre réaction au stress."
    },

    // Questions sur la détection des signaux
    {
      id: 6,
      type: "multiple-choice",
      question: "Votre collègue remarque que vous serrez souvent la mâchoire. Cela pourrait indiquer :",
      options: [
        "Un problème dentaire uniquement",
        "Un signal précoce de tension/stress",
        "Une habitude sans importance",
        "Un manque de calcium"
      ],
      correctAnswer: 1,
      explanation:
        "Le serrement de mâchoire est souvent un signal précoce de tension et de stress, même quand on n'en est pas conscient.",
      practicalTip: "Faites des auto-vérifications régulières : mâchoire, épaules, respiration."
    },
    {
      id: 7,
      type: "scenario",
      question: "Scénario : Vous avez mal dormi, vous êtes irritable, et vous avez du mal à vous concentrer sur vos tâches. Que devriez-vous faire ?",
      options: [
        "Prendre plus de café et forcer la concentration",
        "Reconnaître ces signaux de stress et adapter votre journée",
        "Prendre un jour de congé immédiatement",
        "Ignorer ces signaux car ils passeront"
      ],
      correctAnswer: 1,
      explanation:
        "Ces trois signaux (sommeil, émotion, cognition) indiquent un niveau de stress élevé. Les reconnaître permet d'adapter sa journée : pauses plus fréquentes, tâches moins complexes, techniques de relaxation.",
      practicalTip: "Créez un ‘plan B’ pour les jours où vous détectez plusieurs signaux de stress."
    },

    // Questions sur l'application des techniques de relaxation
    {
      id: 8,
      type: "multiple-choice",
      question: "Quelle technique est la plus efficace pour relâcher rapidement les tensions physiques ?",
      options: [
        "Regarder la télévision",
        "Relaxation musculaire progressive (contracter puis relâcher)",
        "Boire de l'alcool",
        "Faire du sport intensif"
      ],
      correctAnswer: 1,
      explanation:
        "La relaxation musculaire progressive, qui consiste à contracter puis relâcher chaque groupe musculaire, est scientifiquement prouvée pour diminuer les tensions physiques.",
      practicalTip: "5-10 minutes de PMR le soir peuvent améliorer significativement la qualité de votre sommeil."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: boolean | number | null;
  }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean | number) => {
    if (showFeedback[questionId]) return; // Prevent multiple answers

    const question = questions.find((q) => q.id === questionId);
    let isCorrect = false;

    if (question?.type === "true-false") {
      isCorrect = question.answer === answer;
    } else if (question?.type === "multiple-choice" || question?.type === "scenario") {
      isCorrect = question.correctAnswer === answer;
    }

    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setShowFeedback((prev) => ({ ...prev, [questionId]: true }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Check if all questions are answered
    const totalAnswered = Object.keys(userAnswers).length + 1;
    if (totalAnswered === questions.length) {
      setTimeout(() => setQuizCompleted(true), 1000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowFeedback({});
    setScore(0);
    setQuizCompleted(false);
  };

  const getAnsweredCount = () => Object.keys(userAnswers).length;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-6">
            <img
              src="https://images.pexels.com/photos/7092345/pexels-photo-7092345.jpeg"
              alt="Instructeur examinant des tests dans une salle de classe"
              className="w-24 h-16 object-cover rounded-lg mx-auto shadow-lg"
            />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quiz — Maîtrise du stress
          </h2>
          <p className="text-lg text-gray-600">
            Testez vos connaissances théoriques et pratiques sur la gestion du stress
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Progression: {getAnsweredCount()}/{questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(getAnsweredCount() / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Quiz Completed */}
        {quizCompleted && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Quiz terminé !
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Votre score: {score}/{questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recommencer
                </Button>
                <Button onClick={() => navigateToSection('breathing')} className="bg-blue-600 hover:bg-blue-700">
                  <Wind className="w-4 h-4 mr-2" />
                  Pratiquer maintenant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card
              key={question.id}
              className="border-2 border-gray-100 hover:border-primary/20 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    Question {question.id}
                  </span>
                  {showFeedback[question.id] && (
                    <div
                      className={`flex items-center ${
                        userAnswers[question.id] === question.answer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {userAnswers[question.id] === question.answer ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <X className="w-5 h-5" />
                      )}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {question.question}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {!showFeedback[question.id] ? (
                  <div>
                    {/* Questions Vrai/Faux */}
                    {question.type === "true-false" && (
                      <div className="flex gap-4 justify-center">
                        <Button
                          variant="outline"
                          size="lg"
                          className="px-8 py-3 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
                          onClick={() => handleAnswer(question.id, true)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Vrai
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="px-8 py-3 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300"
                          onClick={() => handleAnswer(question.id, false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Faux
                        </Button>
                      </div>
                    )}

                    {/* Questions à choix multiples et scénarios */}
                    {(question.type === "multiple-choice" || question.type === "scenario") && (
                      <div className="space-y-3">
                        {question.options?.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full text-left justify-start h-auto p-4 text-gray-700 hover:bg-primary/5 hover:border-primary/30"
                            onClick={() => handleAnswer(question.id, index)}
                          >
                            <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-medium bg-white">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-sm leading-relaxed text-left">
                              {option}
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Affichage des résultats pour questions Vrai/Faux */}
                    {question.type === "true-false" && (
                      <div
                        className={`p-4 rounded-lg ${
                          userAnswers[question.id] === question.answer
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          {userAnswers[question.id] === question.answer ? (
                            <Check className="w-5 h-5 text-green-600 mr-2" />
                          ) : (
                            <X className="w-5 h-5 text-red-600 mr-2" />
                          )}
                          <span
                            className={`font-semibold ${
                              userAnswers[question.id] === question.answer
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {userAnswers[question.id] === question.answer
                              ? "Correct !"
                              : "Incorrect"}
                          </span>
                        </div>
                        <p
                          className={`mb-3 ${
                            userAnswers[question.id] === question.answer
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {question.explanation}
                        </p>
                        {question.practicalTip && (
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <Lightbulb className="w-4 h-4 inline mr-1" />
                              <strong>Conseil pratique :</strong> {question.practicalTip}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Affichage des résultats pour questions à choix multiples */}
                    {(question.type === "multiple-choice" || question.type === "scenario") && (
                      <div className="space-y-3">
                        {question.options?.map((option, index) => {
                          const isSelected = userAnswers[question.id] === index;
                          const isCorrect = question.correctAnswer === index;

                          return (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 ${
                                isSelected
                                  ? isCorrect
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                  : isCorrect
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3 mt-0.5">
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                    isSelected
                                      ? isCorrect
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                      : isCorrect
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p
                                    className={`text-sm mb-1 ${
                                      isSelected
                                        ? isCorrect
                                          ? "text-green-800"
                                          : "text-red-800"
                                        : isCorrect
                                          ? "text-blue-800"
                                          : "text-gray-700"
                                    }`}
                                  >
                                    {option}
                                  </p>
                                  {(isSelected || isCorrect) && (
                                    <div className="flex items-center mt-2">
                                      {isSelected && (
                                        <div className="flex items-center mr-3">
                                          {isCorrect ? (
                                            <Check className="w-4 h-4 text-green-600 mr-1" />
                                          ) : (
                                            <X className="w-4 h-4 text-red-600 mr-1" />
                                          )}
                                          <span className={`text-xs font-medium ${
                                            isCorrect ? "text-green-600" : "text-red-600"
                                          }`}>
                                            {isCorrect ? "Votre réponse (correct)" : "Votre réponse (incorrect)"}
                                          </span>
                                        </div>
                                      )}
                                      {!isSelected && isCorrect && (
                                        <div className="flex items-center">
                                          <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                                          <span className="text-xs font-medium text-blue-600">
                                            Bonne réponse
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Explication */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700 mb-3">
                            <strong>Explication :</strong> {question.explanation}
                          </p>
                          {question.practicalTip && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-800">
                                <Lightbulb className="w-4 h-4 inline mr-1" />
                                <strong>Conseil pratique :</strong> {question.practicalTip}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function MicroCasesSection() {
  const microCases = [
    {
      id: 1,
      situation:
        "Un collègue vous demande un dossier urgent alors que vous êtes déjà sur une autre tâche prioritaire. Que faites-vous ?",
      options: [
        {
          text: "Vous arrêtez tout pour lui donner le dossier immédiatement",
          isOptimal: false,
          feedback:
            "Cette réaction peut créer du stress supplémentaire. Il est important de communiquer sur vos priorités actuelles.",
        },
        {
          text: "Vous expliquez votre situation et proposez un délai réaliste",
          isOptimal: true,
          feedback:
            "Excellente approche ! La communication transparente permet de gérer les priorités sans stress inutile.",
        },
        {
          text: "Vous ignorez la demande en espérant qu'il oublie",
          isOptimal: false,
          feedback:
            "L'évitement peut aggraver la situation. La communication directe est toujours préférable.",
        },
      ],
    },
    {
      id: 2,
      situation:
        "Votre manager vous confie un nouveau projet alors que votre planning est déjà surchargé. Comment réagissez-vous ?",
      options: [
        {
          text: "Vous acceptez sans rien dire et travaillez plus tard",
          isOptimal: false,
          feedback:
            "Accepter sans communiquer peut mener au burnout. Il est crucial d'être transparent sur votre charge de travail.",
        },
        {
          text: "Vous présentez votre planning actuel et cherchez des solutions ensemble",
          isOptimal: true,
          feedback:
            "Parfait ! Montrer votre charge de travail permet de prioriser ensemble et éviter la surcharge.",
        },
        {
          text: "Vous refusez catégoriquement le nouveau projet",
          isOptimal: false,
          feedback:
            "Un refus direct sans explication peut créer des tensions. Mieux vaut discuter des priorités.",
        },
      ],
    },
    {
      id: 3,
      situation:
        "En réunion, un collègue critique publiquement votre travail devant toute l'équipe. Quelle est votre réaction ?",
      options: [
        {
          text: "Vous répondez immédiatement pour vous défendre",
          isOptimal: false,
          feedback:
            "Une réaction à chaud peut escalader le conflit. Prendre du recul permet une réponse plus mesurée.",
        },
        {
          text: "Vous restez calme et proposez d'en discuter après la réunion",
          isOptimal: true,
          feedback:
            "Excellente gestion ! Garder son calme et reporter la discussion évite l'escalade émotionnelle.",
        },
        {
          text: "Vous encaissez en silence et ruminez après",
          isOptimal: false,
          feedback:
            "Garder sa frustration peut créer du stress chronique. Il est important d'adresser le problème constructivement.",
        },
      ],
    },
    {
      id: 4,
      situation:
        "Vous faites une erreur importante dans un rapport qui a déjà été envoyé au client. Comment gérez-vous la situation ?",
      options: [
        {
          text: "Vous espérez que personne ne s'en apercevra",
          isOptimal: false,
          feedback:
            "L'évitement augmente l'anxiété. Il vaut mieux agir rapidement pour corriger l'erreur.",
        },
        {
          text: "Vous informez immédiatement votre responsable et proposez une solution",
          isOptimal: true,
          feedback:
            "Excellente réaction ! La transparence rapide permet de limiter les dégâts et montre votre responsabilité.",
        },
        {
          text: "Vous paniquez et cherchez quelqu'un d'autre à blâmer",
          isOptimal: false,
          feedback:
            "La panique et le blâme aggravent le stress. Assumer ses erreurs permet de mieux les gérer.",
        },
      ],
    },
    {
      id: 5,
      situation:
        "Vous avez plusieurs échéances importantes le même jour et vous sentez le stress monter. Que faites-vous en priorité ?",
      options: [
        {
          text: "Vous travaillez plus vite en essayant de tout finir",
          isOptimal: false,
          feedback:
            "Accélérer peut augmenter les erreurs et le stress. Mieux vaut prioriser et planifier.",
        },
        {
          text: "Vous faites une pause pour respirer et hiérarchiser vos tâches",
          isOptimal: true,
          feedback:
            "Parfait ! Prendre du recul pour organiser ses priorités est la meilleure stratégie anti-stress.",
        },
        {
          text: "Vous demandez un délai supplémentaire pour tout",
          isOptimal: false,
          feedback:
            "Demander des délais sans analyse peut nuire à votre crédibilité. Mieux vaut prioriser d'abord.",
        },
      ],
    },
  ];

  const [currentCase, setCurrentCase] = useState(0);
  const [userChoices, setUserChoices] = useState<{
    [key: number]: number | null;
  }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [completed, setCompleted] = useState(false);

  const handleChoice = (caseId: number, optionIndex: number) => {
    if (showFeedback[caseId]) return; // Prevent multiple selections

    setUserChoices((prev) => ({ ...prev, [caseId]: optionIndex }));
    setShowFeedback((prev) => ({ ...prev, [caseId]: true }));

    // Check if all cases are completed
    const totalAnswered = Object.keys(userChoices).length + 1;
    if (totalAnswered === microCases.length) {
      setTimeout(() => setCompleted(true), 1000);
    }
  };

  const resetCases = () => {
    setCurrentCase(0);
    setUserChoices({});
    setShowFeedback({});
    setCompleted(false);
  };

  const getCompletedCount = () => Object.keys(userChoices).length;
  const getCorrectCount = () => {
    return Object.entries(userChoices).reduce(
      (count, [caseId, optionIndex]) => {
        const caseData = microCases.find((c) => c.id === parseInt(caseId));
        if (
          caseData &&
          optionIndex !== null &&
          caseData.options[optionIndex]?.isOptimal
        ) {
          return count + 1;
        }
        return count;
      },
      0,
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mb-6">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Équipe diverse collaborant dans un bureau avec ordinateurs portables et tablettes"
              className="w-24 h-16 object-cover rounded-lg mx-auto shadow-lg"
            />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Micro-cas pratiques
          </h2>
          <p className="text-lg text-gray-600">
            Des situations réelles pour appliquer la gestion du stress
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Progression: {getCompletedCount()}/{microCases.length}
            </span>
            {completed && (
              <span className="text-sm font-medium text-primary">
                Réponses optimales: {getCorrectCount()}/{microCases.length}
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(getCompletedCount() / microCases.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Completion Message */}
        {completed && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Micro-cas terminés !
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Vous avez trouvé {getCorrectCount()}/{microCases.length}{" "}
                réponses optimales
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Points clés retenus :
                </h4>
                <ul className="text-blue-700 text-sm space-y-1 text-left max-w-md mx-auto">
                  <li>• La communication transparente prévient le stress</li>
                  <li>• Prendre du recul permet de meilleures décisions</li>
                  <li>• Assumer ses responsabilités réduit l'anxiété</li>
                  <li>��� Prioriser évite la surcharge mentale</li>
                </ul>
              </div>
              <Button onClick={resetCases} className="mt-4">
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Micro Cases */}
        <div className="space-y-6">
          {microCases.map((microCase) => (
            <Card
              key={microCase.id}
              className="border-2 border-gray-100 hover:border-primary/20 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">
                    Cas pratique {microCase.id}
                  </span>
                  {showFeedback[microCase.id] && (
                    <div
                      className={`flex items-center ${
                        userChoices[microCase.id] !== null &&
                        microCase.options[userChoices[microCase.id]!]?.isOptimal
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {userChoices[microCase.id] !== null &&
                      microCase.options[userChoices[microCase.id]!]
                        ?.isOptimal ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg leading-relaxed">
                  {microCase.situation}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {!showFeedback[microCase.id] ? (
                  <div className="space-y-3">
                    {microCase.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4 text-gray-700 hover:bg-primary/5 hover:border-primary/30"
                        onClick={() => handleChoice(microCase.id, index)}
                      >
                        <span className="text-sm leading-relaxed">
                          {option.text}
                        </span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {microCase.options.map((option, index) => {
                      const isSelected = userChoices[microCase.id] === index;
                      const isOptimal = option.isOptimal;

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            isSelected
                              ? isOptimal
                                ? "bg-green-50 border-green-200"
                                : "bg-orange-50 border-orange-200"
                              : isOptimal
                                ? "bg-blue-50 border-blue-200"
                                : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3 mt-0.5">
                              {isSelected ? (
                                isOptimal ? (
                                  <Check className="w-5 h-5 text-green-600" />
                                ) : (
                                  <X className="w-5 h-5 text-orange-600" />
                                )
                              ) : isOptimal ? (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              ) : null}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm mb-2 ${
                                  isSelected
                                    ? isOptimal
                                      ? "text-green-800"
                                      : "text-orange-800"
                                    : isOptimal
                                      ? "text-blue-800"
                                      : "text-gray-700"
                                }`}
                              >
                                {option.text}
                              </p>
                              {(isSelected || isOptimal) && (
                                <p
                                  className={`text-xs ${
                                    isSelected
                                      ? isOptimal
                                        ? "text-green-700"
                                        : "text-orange-700"
                                      : "text-blue-700"
                                  }`}
                                >
                                  {option.feedback}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
