import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Heart,
  Wind,
  Brain,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
} from "lucide-react";

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  instructions: string;
  pattern: number[];
  labels: string[];
  duration: number;
  benefits: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const breathingTechniques: BreathingTechnique[] = [
  {
    id: "box",
    name: "Respiration carrée",
    description: "Technique équilibrée pour réduire le stress et améliorer la concentration",
    instructions: "Inspirez, retenez, expirez, retenez - chaque phase durant 4 secondes",
    pattern: [4, 4, 4, 4],
    labels: ["Inspirer", "Retenir", "Expirer", "Retenir"],
    duration: 120,
    benefits: ["Réduit l'anxiété", "Améliore la concentration", "Équilibre le système nerveux"],
    icon: Square,
    color: "blue",
  },
  {
    id: "calm",
    name: "Respiration 4-7-8",
    description: "Technique relaxante pour favoriser le calme et l'endormissement",
    instructions: "Inspirez 4s, retenez 7s, expirez lentement 8s",
    pattern: [4, 7, 8, 0],
    labels: ["Inspirer", "Retenir", "Expirer", "Pause"],
    duration: 180,
    benefits: ["Favorise la relaxation", "Aide à l'endormissement", "Réduit la tension"],
    icon: Heart,
    color: "purple",
  },
  {
    id: "energizing",
    name: "Respiration énergisante",
    description: "Technique dynamisante pour augmenter l'énergie et la vigilance",
    instructions: "Inspirez profondément 3s, expirez rapidement 1s",
    pattern: [3, 0, 1, 0],
    labels: ["Inspirer", "", "Expirer", ""],
    duration: 60,
    benefits: ["Augmente l'énergie", "Améliore la vigilance", "Stimule la circulation"],
    icon: Wind,
    color: "green",
  },
  {
    id: "coherence",
    name: "Cohérence cardiaque",
    description: "Technique scientifiquement prouvée pour réguler le rythme cardiaque",
    instructions: "Inspirez 5s, expirez 5s - maintenir un rythme régulier",
    pattern: [5, 0, 5, 0],
    labels: ["Inspirer", "", "Expirer", ""],
    duration: 300,
    benefits: ["Régule le rythme cardiaque", "Améliore la variabilité cardiaque", "Réduit le cortisol"],
    icon: Brain,
    color: "indigo",
  },
];

interface BreathingSession {
  technique: string;
  duration: number;
  completedAt: Date;
}

export default function BreathingExercise() {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sessions, setSessions] = useState<BreathingSession[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem("breathing-sessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        completedAt: new Date(s.completedAt),
      })));
    }
  }, []);

  const playTone = useCallback((frequency: number, duration: number) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const startExercise = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setTimeLeft(technique.duration);
    setCurrentPhase(0);
    setPhaseTime(technique.pattern[0]);
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
    setTimeLeft(0);
    setCurrentPhase(0);
    setPhaseTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const completeSession = (technique: BreathingTechnique) => {
    const newSession: BreathingSession = {
      technique: technique.name,
      duration: technique.duration,
      completedAt: new Date(),
    };
    const updatedSessions = [newSession, ...sessions.slice(0, 9)];
    setSessions(updatedSessions);
    localStorage.setItem("breathing-sessions", JSON.stringify(updatedSessions));
    setShowCompletion(true);
  };

  useEffect(() => {
    if (isActive && !isPaused && selectedTechnique) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            completeSession(selectedTechnique);
            return 0;
          }
          return prev - 1;
        });

        setPhaseTime((prev) => {
          if (prev <= 1) {
            setCurrentPhase((phase) => {
              const nextPhase = (phase + 1) % selectedTechnique.pattern.length;
              if (nextPhase === 0 && soundEnabled) {
                playTone(220, 0.1);
              }
              return nextPhase;
            });
            return selectedTechnique.pattern[(currentPhase + 1) % selectedTechnique.pattern.length];
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
  }, [isActive, isPaused, selectedTechnique, currentPhase, soundEnabled, playTone]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentPhaseProgress = () => {
    if (!selectedTechnique) return 0;
    const totalPhaseTime = selectedTechnique.pattern[currentPhase];
    if (totalPhaseTime === 0) return 100;
    return ((totalPhaseTime - phaseTime) / totalPhaseTime) * 100;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 text-white border-blue-200",
      purple: "bg-purple-500 text-white border-purple-200",
      green: "bg-green-500 text-white border-green-200",
      indigo: "bg-indigo-500 text-white border-indigo-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
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
                Retour aux exercices
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
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">{selectedTechnique.name}</CardTitle>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
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
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Cercle de respiration */}
            <div className="relative w-48 h-48 mx-auto">
              <div
                className={`absolute inset-0 rounded-full border-8 transition-all duration-1000 ${
                  currentPhase === 0 || currentPhase === 1
                    ? "border-blue-400 scale-110"
                    : "border-blue-200 scale-90"
                }`}
                style={{
                  transform: `scale(${currentPhase === 0 || currentPhase === 1 ? 1.1 : 0.9})`,
                }}
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-800 mb-1">{phaseTime}</div>
                  <div className="text-sm font-medium text-blue-600">
                    {selectedTechnique.labels[currentPhase]}
                  </div>
                </div>
              </div>
              {/* Indicateur de progression */}
              <div className="absolute inset-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgb(219, 234, 254)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                    strokeDasharray={`${getCurrentPhaseProgress() * 2.83} 283`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {selectedTechnique.instructions}
              </p>
            </div>

            {/* Contrôles */}
            <div className="flex justify-center gap-3">
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
                onClick={stopExercise}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Exercices de respiration guidés
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Des techniques scientifiquement prouvées pour réduire le stress, améliorer la concentration et favoriser la relaxation.
        </p>
      </div>

      {/* Techniques disponibles */}
      <div className="grid md:grid-cols-2 gap-6">
        {breathingTechniques.map((technique) => (
          <Card
            key={technique.id}
            className="border-2 hover:border-primary/30 transition-all duration-200 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${getColorClasses(technique.color)}`}>
                  <technique.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">{technique.name}</CardTitle>
              </div>
              <p className="text-gray-600 leading-relaxed">{technique.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">Pattern :</p>
                <p className="text-sm text-gray-600">{technique.instructions}</p>
              </div>
              
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

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(technique.duration)}</span>
                </div>
                <Button
                  onClick={() => startExercise(technique)}
                  className={`${getColorClasses(technique.color)} hover:opacity-90`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historique des séances */}
      {sessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Dernières séances
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
                  <Badge variant="outline">{formatTime(session.duration)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conseils et informations */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Conseils pour une pratique efficace
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Avant de commencer :</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Trouvez un endroit calme</li>
                <li>Adoptez une posture confortable</li>
                <li>Portez des vêtements amples</li>
                <li>Éteignez les distractions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pendant l'exercice :</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Concentrez-vous sur votre respiration</li>
                <li>N'hésitez pas à faire des pauses</li>
                <li>Arrêtez si vous ressentez un malaise</li>
                <li>Pratiquez régulièrement pour de meilleurs résultats</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
