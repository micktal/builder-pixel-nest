import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  Award,
  BookOpen,
  RotateCcw,
  Download,
  Plus,
  Edit,
  X,
  Brain,
  Heart,
  Wind,
  Activity,
  Lightbulb,
  AlertCircle,
  Trophy,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Save,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ProgressData {
  moduleStarted: string;
  completedSections: string[];
  quizScore: number;
  breathingSessions: number;
  relaxationSessions: number;
  stressChecks: number;
  personalGoals: Goal[];
  achievements: Achievement[];
  weeklyGoals: WeeklyGoal[];
  practiceStreak: number;
  totalPracticeTime: number; // en minutes
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: "breathing" | "relaxation" | "awareness" | "lifestyle" | "work";
  priority: "low" | "medium" | "high";
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}

interface WeeklyGoal {
  week: string;
  goals: {
    breathing: number;
    relaxation: number;
    stressChecks: number;
  };
  completed: {
    breathing: number;
    relaxation: number;
    stressChecks: number;
  };
}

const achievements = [
  {
    id: "first-breath",
    title: "Premier souffle",
    description: "Première séance de respiration terminée",
    icon: "🫁",
    category: "breathing",
    requirement: { type: "breathing", count: 1 }
  },
  {
    id: "zen-master",
    title: "Maître zen",
    description: "10 séances de relaxation complétées",
    icon: "🧘",
    category: "relaxation",
    requirement: { type: "relaxation", count: 10 }
  },
  {
    id: "self-aware",
    title: "Conscience de soi",
    description: "7 jours consécutifs de suivi du stress",
    icon: "🎯",
    category: "awareness",
    requirement: { type: "streak", count: 7 }
  },
  {
    id: "quiz-master",
    title: "Expert en théorie",
    description: "Quiz terminé avec 80% de bonnes réponses",
    icon: "🎓",
    category: "knowledge",
    requirement: { type: "quiz", score: 80 }
  },
  {
    id: "marathon",
    title: "Marathon de la zen",
    description: "100 minutes de pratique cumulées",
    icon: "🏃‍♂️",
    category: "practice",
    requirement: { type: "totalTime", minutes: 100 }
  },
  {
    id: "consistent",
    title: "Régularité",
    description: "14 jours de pratique en 30 jours",
    icon: "📅",
    category: "consistency",
    requirement: { type: "consistency", days: 14, period: 30 }
  }
];

const modulesSections = [
  { id: "intro", name: "Introduction au stress", weight: 10 },
  { id: "mechanisms", name: "Mécanismes du stress", weight: 15 },
  { id: "signals", name: "Signaux d'alarme", weight: 15 },
  { id: "quiz", name: "Quiz de compréhension", weight: 20 },
  { id: "breathing", name: "Exercices de respiration", weight: 15 },
  { id: "relaxation", name: "Techniques de relaxation", weight: 15 },
  { id: "action-plan", name: "Plan d'action personnalisé", weight: 10 }
];

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData>({
    moduleStarted: new Date().toISOString(),
    completedSections: [],
    quizScore: 0,
    breathingSessions: 0,
    relaxationSessions: 0,
    stressChecks: 0,
    personalGoals: [],
    achievements: [],
    weeklyGoals: [],
    practiceStreak: 0,
    totalPracticeTime: 0
  });
  
  const [currentView, setCurrentView] = useState<"overview" | "goals" | "achievements" | "analytics">("overview");
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({});
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("stress-module-progress");
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    }
    
    // Initialiser la semaine courante si elle n'existe pas
    const currentWeek = getWeekString(new Date());
    setProgressData(prev => {
      if (!prev.weeklyGoals.find(w => w.week === currentWeek)) {
        return {
          ...prev,
          weeklyGoals: [
            {
              week: currentWeek,
              goals: { breathing: 3, relaxation: 2, stressChecks: 7 },
              completed: { breathing: 0, relaxation: 0, stressChecks: 0 }
            },
            ...prev.weeklyGoals
          ]
        };
      }
      return prev;
    });
  }, []);

  const saveProgress = (newData: ProgressData) => {
    setProgressData(newData);
    localStorage.setItem("stress-module-progress", JSON.stringify(newData));
  };

  const getWeekString = (date: Date) => {
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const calculateModuleProgress = () => {
    return modulesSections.reduce((total, section) => {
      return total + (progressData.completedSections.includes(section.id) ? section.weight : 0);
    }, 0);
  };

  const exportProgress = () => {
    const report = {
      date: new Date().toLocaleDateString(),
      moduleProgress: `${calculateModuleProgress()}%`,
      completedSections: progressData.completedSections,
      practiceStats: {
        breathingSessions: progressData.breathingSessions,
        relaxationSessions: progressData.relaxationSessions,
        totalPracticeTime: `${progressData.totalPracticeTime} minutes`,
        practiceStreak: `${progressData.practiceStreak} jours`
      },
      goals: progressData.personalGoals,
      achievements: progressData.achievements
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-progression-stress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "breathing": return Wind;
      case "relaxation": return Brain;
      case "awareness": return Target;
      case "lifestyle": return Heart;
      case "work": return Users;
      default: return Activity;
    }
  };

  const currentWeekGoals = progressData.weeklyGoals.find(w => w.week === getWeekString(new Date()));

  // Vue d'ensemble
  if (currentView === "overview") {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Suivi de progression</h2>
            <p className="text-gray-600">Votre parcours personnel de maîtrise du stress</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportProgress} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Progression générale */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {calculateModuleProgress()}%
              </div>
              <p className="text-sm text-blue-700">Module complété</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {progressData.breathingSessions}
              </div>
              <p className="text-sm text-green-700">Séances respiration</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {progressData.relaxationSessions}
              </div>
              <p className="text-sm text-purple-700">Séances relaxation</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {progressData.stressChecks}
              </div>
              <p className="text-sm text-orange-700">Suivis du stress</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Statistiques de pratique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Temps total de pratique</span>
                <span className="text-lg font-bold text-primary">{progressData.totalPracticeTime} min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Série actuelle</span>
                <span className="text-lg font-bold text-green-600">{progressData.practiceStreak} jours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Score au quiz</span>
                <span className="text-lg font-bold text-blue-600">{progressData.quizScore}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Succès récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressData.achievements.length > 0 ? (
                <div className="space-y-3">
                  {progressData.achievements.slice(-3).map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-yellow-900">{achievement.title}</h4>
                        <p className="text-sm text-yellow-700">{achievement.description}</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Continuez vos efforts pour débloquer vos premiers succès !</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation rapide */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            onClick={() => setCurrentView("goals")} 
            variant="outline" 
            className="h-20 flex-col gap-2"
          >
            <Target className="w-6 h-6" />
            <span>Mes objectifs</span>
          </Button>
          <Button 
            onClick={() => setCurrentView("achievements")} 
            variant="outline" 
            className="h-20 flex-col gap-2"
          >
            <Award className="w-6 h-6" />
            <span>Mes succès</span>
          </Button>
          <Button 
            onClick={() => setCurrentView("analytics")} 
            variant="outline" 
            className="h-20 flex-col gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span>Analytiques</span>
          </Button>
        </div>

        {/* Recommandations personnalisées */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Recommandations pour progresser
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressData.breathingSessions < 5 && (
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Wind className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Développez votre pratique respiratoire</p>
                    <p className="text-xs text-blue-700">Essayez de pratiquer 5 minutes de respiration chaque matin.</p>
                  </div>
                </div>
              )}
              
              {progressData.relaxationSessions < 3 && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">Explorez la relaxation</p>
                    <p className="text-xs text-purple-700">Les techniques de relaxation progressive peuvent compléter votre pratique.</p>
                  </div>
                </div>
              )}
              
              {progressData.stressChecks < 7 && (
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Renforcez votre auto-observation</p>
                    <p className="text-xs text-orange-700">Un suivi quotidien vous aidera à mieux identifier vos patterns de stress.</p>
                  </div>
                </div>
              )}
              
              {calculateModuleProgress() < 100 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Continuez le module</p>
                    <p className="text-xs text-green-700">Il vous reste encore des sections à explorer pour compléter votre formation.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Autres vues simplifiées pour éviter un fichier trop long
  if (currentView === "achievements") {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mes succès</h2>
            <p className="text-gray-600">Célébrez vos accomplissements dans la maîtrise du stress</p>
          </div>
          <Button onClick={() => setCurrentView("overview")} variant="outline">
            Retour
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map(achievement => {
            const isUnlocked = progressData.achievements.find(a => a.id === achievement.id);
            
            return (
              <Card key={achievement.id} className={`${isUnlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${isUnlocked ? 'text-yellow-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm mb-3 ${isUnlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      
                      {isUnlocked ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">
                            Débloqué le {new Date(isUnlocked.unlockedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Non débloqué</span>
                        </div>
                      )}
                      
                      <Badge variant="outline" className={`mt-2 ${isUnlocked ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Progression des succès
            </h3>
            <p className="text-blue-700 mb-4">
              {progressData.achievements.length}/{achievements.length} succès débloqués
            </p>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(progressData.achievements.length / achievements.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-blue-600 mt-2">
              {Math.round((progressData.achievements.length / achievements.length) * 100)}% complété
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Retour à la vue overview par défaut
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <Card>
        <CardContent className="p-12">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Suivi de progression</h2>
          <p className="text-gray-600 mb-6">
            Suivez votre parcours dans la maîtrise du stress et célébrez vos accomplissements.
          </p>
          <Button onClick={() => setCurrentView("overview")}>
            Voir mes progrès
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
