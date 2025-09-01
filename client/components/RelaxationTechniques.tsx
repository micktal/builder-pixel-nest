import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  Waves,
  Mountain,
  Leaf,
  Sun,
  Moon,
  Brain,
  Heart,
  Eye,
} from "lucide-react";

interface RelaxationStep {
  id: number;
  instruction: string;
  duration: number;
  type: "instruction" | "pause" | "transition";
}

interface RelaxationTechnique {
  id: string;
  name: string;
  description: string;
  category: "progressive" | "mindfulness" | "visualization" | "grounding";
  duration: number;
  difficulty: "débutant" | "intermédiaire" | "avancé";
  benefits: string[];
  steps: RelaxationStep[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  preparation: string[];
}

const relaxationTechniques: RelaxationTechnique[] = [
  {
    id: "pmr",
    name: "Relaxation Musculaire Progressive",
    description: "Technique de Jacobson pour relâcher les tensions physiques groupe musculaire par groupe musculaire",
    category: "progressive",
    duration: 900, // 15 minutes
    difficulty: "débutant",
    benefits: ["Réduit les tensions musculaires", "Améliore la conscience corporelle", "Favorise le sommeil"],
    icon: Waves,
    color: "blue",
    preparation: [
      "Allongez-vous confortablement",
      "Fermez les yeux",
      "Respirez naturellement",
      "Préparez-vous à contracter puis relâcher chaque groupe musculaire"
    ],
    steps: [
      { id: 1, instruction: "Contractez les muscles de vos pieds pendant 5 secondes", duration: 5, type: "instruction" },
      { id: 2, instruction: "Relâchez complètement et observez la sensation de détente", duration: 10, type: "pause" },
      { id: 3, instruction: "Contractez les muscles de vos mollets", duration: 5, type: "instruction" },
      { id: 4, instruction: "Relâchez et ressentez la différence", duration: 10, type: "pause" },
      { id: 5, instruction: "Contractez les muscles de vos cuisses", duration: 5, type: "instruction" },
      { id: 6, instruction: "Relâchez totalement", duration: 10, type: "pause" },
      { id: 7, instruction: "Contractez vos fessiers", duration: 5, type: "instruction" },
      { id: 8, instruction: "Relâchez et observez la détente", duration: 10, type: "pause" },
      { id: 9, instruction: "Contractez les muscles de votre abdomen", duration: 5, type: "instruction" },
      { id: 10, instruction: "Relâchez complètement", duration: 10, type: "pause" },
      { id: 11, instruction: "Serrez vos poings", duration: 5, type: "instruction" },
      { id: 12, instruction: "Ouvrez vos mains et relâchez", duration: 10, type: "pause" },
      { id: 13, instruction: "Contractez les muscles de vos bras", duration: 5, type: "instruction" },
      { id: 14, instruction: "Laissez vos bras retomber mollement", duration: 10, type: "pause" },
      { id: 15, instruction: "Contractez les muscles de vos épaules", duration: 5, type: "instruction" },
      { id: 16, instruction: "Relâchez et sentez vos épaules s'affaisser", duration: 10, type: "pause" },
      { id: 17, instruction: "Contractez les muscles de votre visage", duration: 5, type: "instruction" },
      { id: 18, instruction: "Relâchez totalement votre visage", duration: 10, type: "pause" },
      { id: 19, instruction: "Observez maintenant tout votre corps détendu", duration: 30, type: "pause" },
      { id: 20, instruction: "Respirez profondément et savourez cette sensation de détente complète", duration: 60, type: "pause" }
    ]
  },
  {
    id: "body-scan",
    name: "Scan Corporel Mindfulness",
    description: "Méditation de pleine conscience focalisée sur les sensations corporelles",
    category: "mindfulness",
    duration: 600, // 10 minutes
    difficulty: "débutant",
    benefits: ["Développe la pleine conscience", "Réduit l'anxiété", "Améliore la connection corps-esprit"],
    icon: Brain,
    color: "purple",
    preparation: [
      "Installez-vous confortablement",
      "Fermez les yeux ou gardez un regard doux",
      "Commencez par quelques respirations profondes",
      "Portez votre attention sur votre corps"
    ],
    steps: [
      { id: 1, instruction: "Portez votre attention sur le sommet de votre crâne", duration: 30, type: "instruction" },
      { id: 2, instruction: "Observez les sensations dans votre front, vos tempes", duration: 30, type: "instruction" },
      { id: 3, instruction: "Descendez vers vos yeux, vos joues, votre mâchoire", duration: 30, type: "instruction" },
      { id: 4, instruction: "Ressentez votre cou, votre nuque", duration: 30, type: "instruction" },
      { id: 5, instruction: "Portez attention à vos épaules", duration: 30, type: "instruction" },
      { id: 6, instruction: "Descendez le long de vos bras jusqu'aux mains", duration: 45, type: "instruction" },
      { id: 7, instruction: "Ressentez votre poitrine qui se soulève et s'abaisse", duration: 45, type: "instruction" },
      { id: 8, instruction: "Observez votre abdomen, votre dos", duration: 45, type: "instruction" },
      { id: 9, instruction: "Portez attention à votre bassin", duration: 30, type: "instruction" },
      { id: 10, instruction: "Descendez vers vos cuisses", duration: 30, type: "instruction" },
      { id: 11, instruction: "Ressentez vos genoux, vos mollets", duration: 30, type: "instruction" },
      { id: 12, instruction: "Terminez par vos pieds, vos orteils", duration: 30, type: "instruction" },
      { id: 13, instruction: "Prenez conscience de votre corps dans son ensemble", duration: 60, type: "pause" },
      { id: 14, instruction: "Respirez tranquillement et revenez doucement", duration: 30, type: "pause" }
    ]
  },
  {
    id: "visualization",
    name: "Visualisation Apaisante",
    description: "Voyage mental vers un lieu de paix et de sérénité",
    category: "visualization",
    duration: 480, // 8 minutes
    difficulty: "intermédiaire",
    benefits: ["Réduit le stress mental", "Favorise la créativité", "Procure un sentiment de bien-être"],
    icon: Mountain,
    color: "green",
    preparation: [
      "Trouvez une position confortable",
      "Fermez les yeux",
      "Respirez calmement",
      "Préparez-vous à imaginer un lieu paisible"
    ],
    steps: [
      { id: 1, instruction: "Imaginez-vous marchant vers un lieu qui vous apaise", duration: 30, type: "instruction" },
      { id: 2, instruction: "Peut-être une plage, une forêt, une montagne... laissez venir", duration: 30, type: "instruction" },
      { id: 3, instruction: "Observez les couleurs autour de vous", duration: 30, type: "instruction" },
      { id: 4, instruction: "Quels sons entendez-vous ? Le vent, l'eau, les oiseaux ?", duration: 30, type: "instruction" },
      { id: 5, instruction: "Ressentez la température sur votre peau", duration: 30, type: "instruction" },
      { id: 6, instruction: "Y a-t-il des parfums, des odeurs agréables ?", duration: 30, type: "instruction" },
      { id: 7, instruction: "Trouvez un endroit parfait pour vous installer", duration: 30, type: "instruction" },
      { id: 8, instruction: "Asseyez-vous ou allongez-vous dans ce lieu", duration: 30, type: "instruction" },
      { id: 9, instruction: "Ressentez le calme et la sécurité de cet endroit", duration: 60, type: "pause" },
      { id: 10, instruction: "Respirez profondément cette paix", duration: 45, type: "pause" },
      { id: 11, instruction: "Savourez ce moment de tranquillité", duration: 60, type: "pause" },
      { id: 12, instruction: "Dites-vous que vous pouvez revenir ici quand vous voulez", duration: 30, type: "instruction" },
      { id: 13, instruction: "Préparez-vous doucement à revenir", duration: 30, type: "transition" },
      { id: 14, instruction: "Bougez délicatement vos doigts, vos orteils", duration: 15, type: "transition" },
      { id: 15, instruction: "Ouvrez les yeux quand vous êtes prêt", duration: 15, type: "transition" }
    ]
  },
  {
    id: "grounding",
    name: "Ancrage 5-4-3-2-1",
    description: "Technique de grounding pour se reconnecter au moment présent",
    category: "grounding",
    duration: 300, // 5 minutes
    difficulty: "débutant",
    benefits: ["Gère l'anxiété aiguë", "Reconnecte au présent", "Calme l'esprit agité"],
    icon: Leaf,
    color: "orange",
    preparation: [
      "Asseyez-vous confortablement",
      "Gardez les yeux ouverts",
      "Respirez naturellement",
      "Préparez-vous à observer votre environnement"
    ],
    steps: [
      { id: 1, instruction: "Regardez autour de vous et nommez 5 choses que vous voyez", duration: 60, type: "instruction" },
      { id: 2, instruction: "Prenez votre temps pour vraiment observer chaque détail", duration: 30, type: "pause" },
      { id: 3, instruction: "Maintenant, identifiez 4 choses que vous pouvez toucher", duration: 60, type: "instruction" },
      { id: 4, instruction: "Explorez les textures, les températures", duration: 30, type: "pause" },
      { id: 5, instruction: "Écoutez et identifiez 3 sons différents", duration: 45, type: "instruction" },
      { id: 6, instruction: "Concentrez-vous sur chaque son séparément", duration: 30, type: "pause" },
      { id: 7, instruction: "Remarquez 2 odeurs ou parfums", duration: 30, type: "instruction" },
      { id: 8, instruction: "Respirez consciemment ces odeurs", duration: 20, type: "pause" },
      { id: 9, instruction: "Identifiez 1 goût dans votre bouche", duration: 20, type: "instruction" },
      { id: 10, instruction: "Prenez conscience de votre corps bien ancré ici et maintenant", duration: 45, type: "pause" }
    ]
  }
];

export default function RelaxationTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState<RelaxationTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimeLeft, setStepTimeLeft] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem("relaxation-sessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        completedAt: new Date(s.completedAt),
      })));
    }
  }, []);

  const playChime = () => {
    if (!soundEnabled || !audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = 440;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const startExercise = (technique: RelaxationTechnique) => {
    setSelectedTechnique(technique);
    setCurrentStep(0);
    setStepTimeLeft(technique.steps[0]?.duration || 0);
    setIsActive(true);
    setIsPaused(false);
    setShowCompletion(false);
  };

  const pauseExercise = () => {
    setIsPaused(!isPaused);
  };

  const stopExercise = () => {
    setIsActive(false);
    setIsPaused(false);
    setSelectedTechnique(null);
    setCurrentStep(0);
    setStepTimeLeft(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const nextStep = () => {
    if (!selectedTechnique) return;
    
    if (currentStep < selectedTechnique.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStepTimeLeft(selectedTechnique.steps[currentStep + 1]?.duration || 0);
      if (soundEnabled) playChime();
    } else {
      completeSession();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setStepTimeLeft(selectedTechnique?.steps[currentStep - 1]?.duration || 0);
    }
  };

  const completeSession = () => {
    if (!selectedTechnique) return;
    
    const newSession = {
      technique: selectedTechnique.name,
      category: selectedTechnique.category,
      duration: selectedTechnique.duration,
      completedAt: new Date(),
    };
    
    const updatedSessions = [newSession, ...sessions.slice(0, 9)];
    setSessions(updatedSessions);
    localStorage.setItem("relaxation-sessions", JSON.stringify(updatedSessions));
    
    setIsActive(false);
    setShowCompletion(true);
  };

  useEffect(() => {
    if (isActive && !isPaused && selectedTechnique) {
      intervalRef.current = setInterval(() => {
        setStepTimeLeft((prev) => {
          if (prev <= 1) {
            nextStep();
            return selectedTechnique.steps[currentStep + 1]?.duration || 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, currentStep, selectedTechnique]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (!selectedTechnique) return 0;
    return ((currentStep + 1) / selectedTechnique.steps.length) * 100;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "progressive": return Waves;
      case "mindfulness": return Brain;
      case "visualization": return Mountain;
      case "grounding": return Leaf;
      default: return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "progressive": return "bg-blue-100 text-blue-800 border-blue-200";
      case "mindfulness": return "bg-purple-100 text-purple-800 border-purple-200";
      case "visualization": return "bg-green-100 text-green-800 border-green-200";
      case "grounding": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "débutant": return "bg-green-100 text-green-800";
      case "intermédiaire": return "bg-yellow-100 text-yellow-800";
      case "avancé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Séance terminée !</h3>
            <p className="text-lg text-gray-600 mb-4">
              Excellente pratique de {selectedTechnique?.name}
            </p>
            <div className="bg-white p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Durée de la séance :</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedTechnique && formatTime(selectedTechnique.duration)}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setShowCompletion(false)} variant="outline">
                Retour aux techniques
              </Button>
              <Button
                onClick={() => selectedTechnique && startExercise(selectedTechnique)}
                className="bg-green-600 hover:bg-green-700"
              >
                Recommencer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isActive && selectedTechnique) {
    const currentStepData = selectedTechnique.steps[currentStep];
    
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-slate-50 to-indigo-50 border-2 border-indigo-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">{selectedTechnique.name}</CardTitle>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Étape {currentStep + 1}/{selectedTechnique.steps.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{stepTimeLeft}s</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSound}
                className="p-1"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            {/* Instruction actuelle */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100">
              <p className="text-lg text-gray-800 leading-relaxed">
                {currentStepData?.instruction}
              </p>
              {currentStepData?.type === "pause" && (
                <div className="mt-4 text-sm text-gray-600">
                  Prenez votre temps pour ressentir...
                </div>
              )}
            </div>

            {/* Timer circulaire */}
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(224, 231, 255)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(99, 102, 241)"
                  strokeWidth="8"
                  strokeDasharray={`${((currentStepData?.duration - stepTimeLeft) / currentStepData?.duration) * 251.2} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-indigo-600">{stepTimeLeft}</span>
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex justify-center gap-2">
              <Button
                onClick={prevStep}
                variant="outline"
                size="sm"
                disabled={currentStep === 0}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                onClick={pauseExercise}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? "Reprendre" : "Pause"}
              </Button>
              <Button
                onClick={nextStep}
                variant="outline"
                size="sm"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button
                onClick={stopExercise}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 ml-4"
              >
                <Square className="w-5 h-5" />
                Arrêter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Techniques de relaxation guidées
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez des méthodes éprouvées de relaxation progressive, mindfulness et visualisation pour une gestion efficace du stress.
        </p>
      </div>

      {/* Techniques disponibles */}
      <div className="grid md:grid-cols-2 gap-6">
        {relaxationTechniques.map((technique) => {
          const IconComponent = technique.icon;
          const CategoryIcon = getCategoryIcon(technique.category);
          
          return (
            <Card
              key={technique.id}
              className="border-2 hover:border-primary/30 transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(technique.category)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{technique.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className={getDifficultyColor(technique.difficulty)}>
                          {technique.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(technique.duration)}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{technique.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Bénéfices :</p>
                  <div className="flex flex-wrap gap-1">
                    {technique.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Préparation :</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {technique.preparation.map((prep, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => startExercise(technique)}
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Commencer la séance
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Historique des séances */}
      {sessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Historique des relaxations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{session.technique}</p>
                    <p className="text-sm text-gray-500">
                      {session.completedAt.toLocaleDateString()} à{" "}
                      {session.completedAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{formatTime(session.duration)}</Badge>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{session.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guide et conseils */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Guide pour une relaxation optimale
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Moment idéal
              </h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Choisissez un moment calme</li>
                <li>Évitez après les repas</li>
                <li>Le soir pour favoriser le sommeil</li>
                <li>Régularité importante</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Environnement
              </h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Pièce calme et tempérée</li>
                <li>Lumière tamisée</li>
                <li>Téléphone en mode silencieux</li>
                <li>Position confortable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Attitude
              </h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Bienveillance envers soi</li>
                <li>Patience avec la pratique</li>
                <li>Accepter les distractions</li>
                <li>Pas de performance à atteindre</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
