import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Heart,
  Activity,
  User,
  Eye,
  TrendingUp,
  Calendar,
  Target,
  Bell,
  Plus,
  X,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Save,
  Download,
} from "lucide-react";

interface StressSignal {
  id: string;
  category: "physical" | "emotional" | "cognitive" | "behavioral";
  name: string;
  description: string;
  intensity: 1 | 2 | 3; // 1=subtil, 2=modéré, 3=évident
  isPersonal: boolean;
}

interface DailyCheck {
  date: string;
  signals: string[];
  overallLevel: number;
  notes: string;
  triggers: string[];
}

interface PersonalPlan {
  personalSignals: string[];
  checkFrequency: "daily" | "weekly";
  reminderTime: string;
  actionSteps: string[];
}

const defaultSignals: StressSignal[] = [
  // Physical
  { id: "tension-shoulders", category: "physical", name: "Tension dans les épaules", description: "Sensation de raideur ou de nœuds dans les épaules", intensity: 2, isPersonal: false },
  { id: "headache", category: "physical", name: "Maux de tête", description: "Douleurs ou tensions au niveau du crâne", intensity: 2, isPersonal: false },
  { id: "jaw-clench", category: "physical", name: "Serrement de mâchoire", description: "Contraction involontaire des muscles de la mâchoire", intensity: 1, isPersonal: false },
  { id: "shallow-breathing", category: "physical", name: "Respiration superficielle", description: "Respiration rapide et courte", intensity: 1, isPersonal: false },
  { id: "stomach-knots", category: "physical", name: "Nœud à l'estomac", description: "Sensation de serrement ou crampes abdominales", intensity: 2, isPersonal: false },
  { id: "fatigue", category: "physical", name: "Fatigue inexpliquée", description: "Épuisement sans raison apparente", intensity: 2, isPersonal: false },
  { id: "sleep-troubles", category: "physical", name: "Troubles du sommeil", description: "Difficultés d'endormissement ou réveils nocturnes", intensity: 3, isPersonal: false },
  
  // Emotional
  { id: "irritability", category: "emotional", name: "Irritabilité", description: "Réactions disproportionnées à des situations mineures", intensity: 2, isPersonal: false },
  { id: "anxiety", category: "emotional", name: "Anxiété", description: "Sentiment d'inquiétude ou d'appréhension", intensity: 2, isPersonal: false },
  { id: "mood-swings", category: "emotional", name: "Sautes d'humeur", description: "Changements d'humeur rapides et imprévisibles", intensity: 2, isPersonal: false },
  { id: "overwhelmed", category: "emotional", name: "Sentiment d'être dépassé", description: "Impression de ne plus pouvoir faire face", intensity: 3, isPersonal: false },
  { id: "emotional-numbness", category: "emotional", name: "Détachement émotionnel", description: "Difficulté à ressentir des émotions", intensity: 1, isPersonal: false },
  
  // Cognitive
  { id: "concentration-issues", category: "cognitive", name: "Difficultés de concentration", description: "Trouble à maintenir son attention sur une tâche", intensity: 2, isPersonal: false },
  { id: "memory-lapses", category: "cognitive", name: "Trous de mémoire", description: "Oublis plus fréquents que d'habitude", intensity: 2, isPersonal: false },
  { id: "negative-thoughts", category: "cognitive", name: "Pensées négatives récurrentes", description: "Ruminations ou pessimisme inhabituel", intensity: 2, isPersonal: false },
  { id: "decision-paralysis", category: "cognitive", name: "Indécision", description: "Difficulté à prendre des décisions simples", intensity: 1, isPersonal: false },
  { id: "racing-thoughts", category: "cognitive", name: "Pensées qui s'emballent", description: "Mental qui tourne en boucle", intensity: 2, isPersonal: false },
  
  // Behavioral
  { id: "procrastination", category: "behavioral", name: "Procrastination", description: "Report systématique des tâches importantes", intensity: 2, isPersonal: false },
  { id: "social-withdrawal", category: "behavioral", name: "Isolement social", description: "Évitement des interactions sociales", intensity: 2, isPersonal: false },
  { id: "nervous-habits", category: "behavioral", name: "Tics nerveux", description: "Gestes répétitifs involontaires", intensity: 1, isPersonal: false },
  { id: "appetite-changes", category: "behavioral", name: "Changements d'appétit", description: "Perte ou augmentation inhabituelle de l'appétit", intensity: 2, isPersonal: false },
  { id: "screen-time", category: "behavioral", name: "Augmentation du temps d'écran", description: "Utilisation excessive des écrans pour éviter", intensity: 1, isPersonal: false },
];

export default function EarlyWarningSigns() {
  const [currentView, setCurrentView] = useState<"overview" | "assessment" | "tracker" | "plan">("overview");
  const [signals, setSignals] = useState<StressSignal[]>(defaultSignals);
  const [dailyChecks, setDailyChecks] = useState<DailyCheck[]>([]);
  const [personalPlan, setPersonalPlan] = useState<PersonalPlan | null>(null);
  const [currentCheck, setCurrentCheck] = useState<Partial<DailyCheck>>({
    date: new Date().toISOString().split('T')[0],
    signals: [],
    overallLevel: 1,
    notes: "",
    triggers: []
  });
  const [newSignal, setNewSignal] = useState({ name: "", description: "", category: "physical" as const });

  useEffect(() => {
    const savedSignals = localStorage.getItem("personal-stress-signals");
    const savedChecks = localStorage.getItem("daily-stress-checks");
    const savedPlan = localStorage.getItem("personal-stress-plan");
    
    if (savedSignals) {
      setSignals(JSON.parse(savedSignals));
    }
    if (savedChecks) {
      setDailyChecks(JSON.parse(savedChecks));
    }
    if (savedPlan) {
      setPersonalPlan(JSON.parse(savedPlan));
    }
  }, []);

  const saveData = () => {
    localStorage.setItem("personal-stress-signals", JSON.stringify(signals));
    localStorage.setItem("daily-stress-checks", JSON.stringify(dailyChecks));
    if (personalPlan) {
      localStorage.setItem("personal-stress-plan", JSON.stringify(personalPlan));
    }
  };

  const togglePersonalSignal = (signalId: string) => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId ? { ...signal, isPersonal: !signal.isPersonal } : signal
    ));
  };

  const addCustomSignal = () => {
    if (newSignal.name.trim()) {
      const customSignal: StressSignal = {
        id: `custom-${Date.now()}`,
        name: newSignal.name,
        description: newSignal.description,
        category: newSignal.category,
        intensity: 2,
        isPersonal: true
      };
      setSignals(prev => [...prev, customSignal]);
      setNewSignal({ name: "", description: "", category: "physical" });
    }
  };

  const removeCustomSignal = (signalId: string) => {
    setSignals(prev => prev.filter(signal => signal.id !== signalId));
  };

  const handleDailyCheck = () => {
    const check: DailyCheck = {
      date: currentCheck.date!,
      signals: currentCheck.signals!,
      overallLevel: currentCheck.overallLevel!,
      notes: currentCheck.notes!,
      triggers: currentCheck.triggers!
    };
    
    setDailyChecks(prev => {
      const filtered = prev.filter(c => c.date !== check.date);
      return [check, ...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    setCurrentCheck({
      date: new Date().toISOString().split('T')[0],
      signals: [],
      overallLevel: 1,
      notes: "",
      triggers: []
    });
  };

  const createPersonalPlan = () => {
    const personalSignalIds = signals.filter(s => s.isPersonal).map(s => s.id);
    const plan: PersonalPlan = {
      personalSignals: personalSignalIds,
      checkFrequency: "daily",
      reminderTime: "18:00",
      actionSteps: [
        "Prendre 3 respirations profondes",
        "Faire une pause de 5 minutes",
        "Pratiquer un exercice de relaxation",
        "Identifier et noter les déclencheurs"
      ]
    };
    setPersonalPlan(plan);
  };

  const getSignalsByCategory = (category: string) => {
    return signals.filter(signal => signal.category === category);
  };

  const getPersonalSignals = () => {
    return signals.filter(signal => signal.isPersonal);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "physical": return Activity;
      case "emotional": return Heart;
      case "cognitive": return Brain;
      case "behavioral": return User;
      default: return AlertTriangle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "physical": return "bg-red-100 text-red-800 border-red-200";
      case "emotional": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cognitive": return "bg-purple-100 text-purple-800 border-purple-200";
      case "behavioral": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return "text-yellow-600";
      case 2: return "text-orange-600";
      case 3: return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getRecentTrend = () => {
    const recent = dailyChecks.slice(0, 7);
    if (recent.length < 2) return null;
    
    const avgRecent = recent.reduce((sum, check) => sum + check.overallLevel, 0) / recent.length;
    const avgBefore = dailyChecks.slice(7, 14).reduce((sum, check) => sum + check.overallLevel, 0) / Math.max(dailyChecks.slice(7, 14).length, 1);
    
    return avgRecent > avgBefore ? "increasing" : avgRecent < avgBefore ? "decreasing" : "stable";
  };

  const exportData = () => {
    const data = {
      personalSignals: getPersonalSignals(),
      recentChecks: dailyChecks.slice(0, 30),
      plan: personalPlan
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stress-signals-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Vue d'ensemble
  if (currentView === "overview") {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Détection des signaux d'alarme
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Apprenez à reconnaître vos signaux personnels de stress pour intervenir avant qu'il ne s'intensifie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/30 transition-all duration-200 cursor-pointer" onClick={() => setCurrentView("assessment")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Identifier mes signaux</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Découvrez et personnalisez votre liste de signaux d'alarme du stress.
              </p>
              <Badge variant="outline" className="bg-blue-50">
                {getPersonalSignals().length} signaux personnels
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/30 transition-all duration-200 cursor-pointer" onClick={() => setCurrentView("tracker")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Suivi quotidien</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Notez vos observations quotidiennes et suivez l'évolution.
              </p>
              <Badge variant="outline" className="bg-green-50">
                {dailyChecks.length} entrées enregistrées
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/30 transition-all duration-200 cursor-pointer" onClick={() => setCurrentView("plan")}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Plan d'action</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Créez votre plan personnalisé de gestion des signaux.
              </p>
              <Badge variant="outline" className={personalPlan ? "bg-purple-50" : "bg-gray-50"}>
                {personalPlan ? "Plan créé" : "À créer"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Aperçu des données récentes */}
        {dailyChecks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Aperçu récent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {dailyChecks.slice(0, 7).reduce((sum, check) => sum + check.overallLevel, 0) / Math.min(dailyChecks.length, 7) || 0}
                  </p>
                  <p className="text-sm text-gray-600">Niveau moyen (7 derniers jours)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {Math.max(...dailyChecks.slice(0, 7).map(c => c.signals.length))}
                  </p>
                  <p className="text-sm text-gray-600">Signaux max en une journée</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getRecentTrend() === "decreasing" ? "text-green-600" : getRecentTrend() === "increasing" ? "text-red-600" : "text-gray-600"}`}>
                    {getRecentTrend() === "decreasing" ? "↓" : getRecentTrend() === "increasing" ? "↑" : "→"}
                  </p>
                  <p className="text-sm text-gray-600">Tendance récente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guide rapide */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Guide de détection précoce
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Signaux physiques subtils :</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Micro-tensions dans les épaules</li>
                  <li>Respiration plus courte</li>
                  <li>Changements dans la posture</li>
                  <li>Serrement involontaire de la mâchoire</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Signaux comportementaux :</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Procrastination inhabituelle</li>
                  <li>Vérifications répétées</li>
                  <li>Évitement de certaines tâches</li>
                  <li>Changements dans les habitudes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Vue d'évaluation des signaux
  if (currentView === "assessment") {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Identification des signaux personnels</h2>
            <p className="text-gray-600">Sélectionnez les signaux qui vous correspondent le mieux</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveData} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={() => setCurrentView("overview")} variant="outline">
              Retour
            </Button>
          </div>
        </div>

        {/* Signaux par catégorie */}
        {["physical", "emotional", "cognitive", "behavioral"].map(category => {
          const categorySignals = getSignalsByCategory(category);
          const CategoryIcon = getCategoryIcon(category);
          
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <span className="capitalize">
                    {category === "physical" && "Signaux physiques"}
                    {category === "emotional" && "Signaux émotionnels"}
                    {category === "cognitive" && "Signaux cognitifs"}
                    {category === "behavioral" && "Signaux comportementaux"}
                  </span>
                  <Badge variant="outline">
                    {categorySignals.filter(s => s.isPersonal).length}/{categorySignals.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {categorySignals.map(signal => (
                    <div
                      key={signal.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        signal.isPersonal 
                          ? "border-primary bg-primary/5" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => togglePersonalSignal(signal.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{signal.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{signal.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`${getIntensityColor(signal.intensity)} border-current`}>
                              {signal.intensity === 1 && "Subtil"}
                              {signal.intensity === 2 && "Modéré"}
                              {signal.intensity === 3 && "Évident"}
                            </Badge>
                            {signal.id.startsWith("custom-") && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCustomSignal(signal.id);
                                }}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          {signal.isPersonal ? (
                            <CheckCircle className="w-6 h-6 text-primary" />
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Ajouter un signal personnalisé */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Ajouter un signal personnalisé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du signal</label>
                <input
                  type="text"
                  value={newSignal.name}
                  onChange={(e) => setNewSignal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Bâillements fréquents"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={newSignal.category}
                  onChange={(e) => setNewSignal(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="physical">Physique</option>
                  <option value="emotional">Émotionnel</option>
                  <option value="cognitive">Cognitif</option>
                  <option value="behavioral">Comportemental</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={addCustomSignal} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>
            {newSignal.name && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optionnelle)</label>
                <textarea
                  value={newSignal.description}
                  onChange={(e) => setNewSignal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée du signal..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            onClick={() => {
              saveData();
              setCurrentView("tracker");
            }}
            size="lg"
            className="px-8"
          >
            Continuer vers le suivi
          </Button>
        </div>
      </div>
    );
  }

  // Vue tracker quotidien
  if (currentView === "tracker") {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Suivi quotidien</h2>
            <p className="text-gray-600">Notez vos observations pour identifier les patterns</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button onClick={() => setCurrentView("overview")} variant="outline">
              Retour
            </Button>
          </div>
        </div>

        {/* Check du jour */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Check du {new Date(currentCheck.date!).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Signaux ressentis */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Signaux ressentis aujourd'hui :</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {getPersonalSignals().map(signal => (
                  <div
                    key={signal.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      currentCheck.signals?.includes(signal.id)
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setCurrentCheck(prev => ({
                        ...prev,
                        signals: prev.signals?.includes(signal.id)
                          ? prev.signals.filter(id => id !== signal.id)
                          : [...(prev.signals || []), signal.id]
                      }));
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{signal.name}</span>
                      {currentCheck.signals?.includes(signal.id) && (
                        <CheckCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Niveau général */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Niveau de stress global (1-5) :</h4>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setCurrentCheck(prev => ({ ...prev, overallLevel: level }))}
                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                      currentCheck.overallLevel === level
                        ? level <= 2 ? "border-green-500 bg-green-100 text-green-700"
                          : level === 3 ? "border-yellow-500 bg-yellow-100 text-yellow-700"
                          : "border-red-500 bg-red-100 text-red-700"
                        : "border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Notes personnelles :</h4>
              <textarea
                value={currentCheck.notes}
                onChange={(e) => setCurrentCheck(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Contexte, déclencheurs, observations..."
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>

            <Button 
              onClick={() => {
                handleDailyCheck();
                saveData();
              }}
              className="w-full"
              size="lg"
            >
              Enregistrer le check du jour
            </Button>
          </CardContent>
        </Card>

        {/* Historique récent */}
        {dailyChecks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Historique récent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyChecks.slice(0, 7).map(check => (
                  <div key={check.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{new Date(check.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">
                        {check.signals.length} signaux • Niveau {check.overallLevel}/5
                      </p>
                      {check.notes && (
                        <p className="text-xs text-gray-500 mt-1">{check.notes.substring(0, 50)}...</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        check.overallLevel <= 2 ? "text-green-600" :
                        check.overallLevel === 3 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {check.overallLevel}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Vue plan d'action
  if (currentView === "plan") {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plan d'action personnalisé</h2>
            <p className="text-gray-600">Stratégies d'intervention selon vos signaux</p>
          </div>
          <Button onClick={() => setCurrentView("overview")} variant="outline">
            Retour
          </Button>
        </div>

        {!personalPlan ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Créez votre plan personnalisé</h3>
              <p className="text-gray-600 mb-6">
                Basé sur vos signaux personnels, nous créerons un plan d'action adapté.
              </p>
              <Button onClick={createPersonalPlan} size="lg">
                Créer mon plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Plan actuel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Votre plan d'action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Vos signaux prioritaires :</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalPlan.personalSignals.map(signalId => {
                      const signal = signals.find(s => s.id === signalId);
                      return signal ? (
                        <Badge key={signalId} variant="outline" className={getCategoryColor(signal.category)}>
                          {signal.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Actions immédiates :</h4>
                  <ul className="space-y-2">
                    {personalPlan.actionSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Fréquence de vérification</h5>
                    <p className="text-blue-700">{personalPlan.checkFrequency === "daily" ? "Quotidienne" : "Hebdomadaire"}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-2">Rappel programmé</h5>
                    <p className="text-purple-700">{personalPlan.reminderTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conseils contextuels */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Conseils pour l'application
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-medium mb-2">Dès les premiers signaux :</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Faire une pause consciente de 2 minutes</li>
                      <li>Pratiquer 3 respirations profondes</li>
                      <li>Identifier le déclencheur si possible</li>
                      <li>Appliquer une technique de relaxation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">En cas d'escalade :</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Se retirer temporairement de la situation</li>
                      <li>Utiliser la technique de grounding 5-4-3-2-1</li>
                      <li>Contacter une personne de confiance</li>
                      <li>Planifier une récupération active</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  setPersonalPlan(null);
                  createPersonalPlan();
                }}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recréer le plan
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
