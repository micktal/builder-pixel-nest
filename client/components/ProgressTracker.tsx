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

  const exportProgress = async () => {
    const date = new Date().toLocaleDateString("fr-FR");
    const moduleProgress = calculateModuleProgress();

    // Create a temporary div with our PDF content
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";
    tempDiv.style.width = "800px";
    tempDiv.style.background = "#ffffff";
    tempDiv.style.fontFamily = "Arial, sans-serif";

    // SVG Icons helpers
    const getIconSVG = (iconName: string, size = 24, color = "currentColor") => {
      const icons = {
        trophy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
        target: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        wind: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
        brain: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.4 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,
        book: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
        star: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
        trendingUp: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>`
      };
      return icons[iconName] || icons.star;
    };

    tempDiv.innerHTML = `
      <div style="padding: 40px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f3e8ff 100%); min-height: 900px;">
        <!-- Header with company logo -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="margin-bottom: 20px;">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F2a0a35359508479d8ae89ef9e31f1265?format=webp&width=800"
                 alt="Fiducial FPSG"
                 style="height: 80px; max-width: 300px; object-fit: contain;" />
          </div>
          <h1 style="font-size: 36px; color: #166734; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); font-weight: 700;">
            Rapport de Progression
          </h1>
          <p style="font-size: 18px; color: #6b7280; margin: 10px 0; font-style: italic;">
            Module Gestion du Stress • ${date}
          </p>
          <div style="height: 4px; background: linear-gradient(90deg, #166734, #10b981, #06b6d4, #8b5cf6); border-radius: 2px; margin: 20px auto; width: 300px;"></div>
        </div>

        <!-- Progress Overview -->
        <div style="background: linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%); border-radius: 20px; padding: 30px; margin-bottom: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 3px solid white;">
          <div style="text-align: center;">
            <div style="margin-bottom: 15px; color: #6d28d9; filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));">
              ${getIconSVG('trophy', 80, '#6d28d9')}
            </div>
            <h2 style="font-size: 28px; color: #6d28d9; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
              Module complété à ${moduleProgress}%
            </h2>
            <div style="font-size: 18px; color: #4c1d95; margin: 15px 0;">
              ${progressData.completedSections.length}/${modulesSections.length} sections terminées
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 15px; padding: 25px; border-left: 6px solid #10b981;">
            <h3 style="color: #059669; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
              <span style="margin-right: 10px; color: #059669;">${getIconSVG('wind', 24, '#059669')}</span> Pratique respiratoire
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div style="background: white; padding: 15px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #059669;">${progressData.breathingSessions}</div>
                <div style="font-size: 12px; color: #065f46;">Séances</div>
              </div>
              <div style="background: white; padding: 15px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #059669;">${progressData.totalPracticeTime}</div>
                <div style="font-size: 12px; color: #065f46;">Minutes</div>
              </div>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #fef7cd 0%, #fef3c7 100%); border-radius: 15px; padding: 25px; border-left: 6px solid #f59e0b;">
            <h3 style="color: #d97706; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
              <span style="margin-right: 10px; color: #d97706;">${getIconSVG('brain', 24, '#d97706')}</span> Bien-être mental
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div style="background: white; padding: 15px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #d97706;">${progressData.relaxationSessions}</div>
                <div style="font-size: 12px; color: #92400e;">Relaxations</div>
              </div>
              <div style="background: white; padding: 15px; border-radius: 10px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #d97706;">${progressData.practiceStreak}</div>
                <div style="font-size: 12px; color: #92400e;">Jours consécutifs</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 15px; padding: 25px; margin-bottom: 25px; border-left: 6px solid #ec4899;">
          <h3 style="color: #be185d; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="margin-right: 10px; color: #be185d;">${getIconSVG('trendingUp', 24, '#be185d')}</span> Progression du module
          </h3>
          <div style="background: white; border-radius: 10px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #374151; font-weight: bold;">Avancement</span>
              <span style="color: #be185d; font-weight: bold;">${moduleProgress}%</span>
            </div>
            <div style="width: 100%; height: 20px; background: #f3f4f6; border-radius: 10px; overflow: hidden;">
              <div style="height: 100%; background: linear-gradient(90deg, #ec4899, #be185d); width: ${moduleProgress}%; transition: width 0.5s ease;"></div>
            </div>
          </div>
        </div>

        <!-- Achievements Section -->
        <div style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border-radius: 15px; padding: 25px; margin-bottom: 25px; border-left: 6px solid #0ea5e9;">
          <h3 style="color: #0369a1; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="margin-right: 10px; color: #0369a1;">${getIconSVG('star', 24, '#0369a1')}</span> Succès débloqués
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            ${progressData.achievements.length > 0 ?
              progressData.achievements.slice(0, 4).map(achievement => `
                <div style="background: white; padding: 15px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
                  <div style="font-size: 24px;">${achievement.icon}</div>
                  <div>
                    <div style="font-weight: bold; color: #374151; font-size: 14px;">${achievement.title}</div>
                    <div style="color: #6b7280; font-size: 12px;">${new Date(achievement.unlockedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              `).join('') :
              `<div style="grid-column: 1 / -1; text-align: center; color: #6b7280; padding: 20px;">
                <div style="margin-bottom: 10px;">${getIconSVG('trophy', 40, '#d1d5db')}</div>
                <div>Continuez vos efforts pour débloquer vos premiers succès !</div>
              </div>`
            }
          </div>
        </div>

        <!-- Recommendations -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 15px; padding: 25px; margin-bottom: 25px; border-left: 6px solid #22c55e;">
          <h3 style="color: #15803d; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
            <span style="margin-right: 10px; color: #15803d;">${getIconSVG('target', 24, '#15803d')}</span> Recommandations personnalisées
          </h3>
          <div style="space-y: 12px;">
            ${progressData.breathingSessions < 5 ? `
              <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <div style="color: #15803d; font-weight: bold; font-size: 14px;">🫁 Développez votre pratique respiratoire</div>
                <div style="color: #166534; font-size: 12px;">Essayez de pratiquer 5 minutes de respiration chaque matin.</div>
              </div>
            ` : ''}
            ${progressData.relaxationSessions < 3 ? `
              <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <div style="color: #15803d; font-weight: bold; font-size: 14px;">🧘 Explorez la relaxation</div>
                <div style="color: #166534; font-size: 12px;">Les techniques de relaxation progressive peuvent compléter votre pratique.</div>
              </div>
            ` : ''}
            ${moduleProgress < 100 ? `
              <div style="background: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <div style="color: #15803d; font-weight: bold; font-size: 14px;">📚 Continuez le module</div>
                <div style="color: #166534; font-size: 12px;">Il vous reste encore des sections à explorer pour compléter votre formation.</div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; border-top: 2px dashed #d1d5db; margin-top: 30px;">
          <div style="margin-bottom: 15px; font-size: 16px; color: #6b7280;">
            Rapport généré automatiquement le ${date}
          </div>
          <div style="margin-top: 15px; text-align: center;">
            <strong style="color: #166734; font-size: 14px;">FIDUCIAL FPSG</strong>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF (handle multiple pages if needed)
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      pdf.save(`rapport-progression-fiducial-${date.replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback to simple text download
      const report = {
        date: date,
        moduleProgress: `${moduleProgress}%`,
        completedSections: progressData.completedSections,
        practiceStats: {
          breathingSessions: progressData.breathingSessions,
          relaxationSessions: progressData.relaxationSessions,
          totalPracticeTime: `${progressData.totalPracticeTime} minutes`,
          practiceStreak: `${progressData.practiceStreak} jours`
        },
        achievements: progressData.achievements
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport-progression-${date.replace(/\//g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      // Clean up
      document.body.removeChild(tempDiv);
    }
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
            <Button
              onClick={exportProgress}
              variant="outline"
              className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-blue-100 hover:border-purple-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Rapport PDF
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
