import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import React from "react";
import {
  AlertTriangle,
  Activity,
  RefreshCw,
  TrendingDown,
  CheckCircle,
} from "lucide-react";

export default function StressEvolutionSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const timelineSteps = [
    {
      id: 1,
      title: "Événement déclencheur",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200",
      description: "Un stimulus externe perturbe l'équilibre",
      detailedContent: {
        explanation:
          "L'événement déclencheur est le point de départ de la réaction de stress. Il peut être prévisible ou inattendu.",
        examples: [
          "Surcharge de travail soudaine",
          "Conflit avec un collègue",
          "Panne technique urgente",
          "Présentation devant la direction",
          "Échéance serrée impromptue",
        ],
        keyPoints: [
          "Perception subjective de la situation",
          "Intensité variable selon les individus",
          "Peut être réel ou anticipé",
        ],
      },
    },
    {
      id: 2,
      title: "Réaction physiologique",
      icon: Activity,
      color: "text-red-500",
      bgColor: "bg-red-100",
      borderColor: "border-red-200",
      description: "Le corps se mobilise face au défi",
      detailedContent: {
        explanation:
          "Le système nerveux sympathique s'active instantanément, préparant le corps à l'action.",
        examples: [
          "Augmentation du rythme cardiaque",
          "Libération d'adrénaline et cortisol",
          "Tensions musculaires",
          "Respiration accélérée",
          "Hypervigilance",
        ],
        keyPoints: [
          "Réaction automatique et involontaire",
          "Mobilisation des ressources énergétiques",
          "Amélioration temporaire des performances",
        ],
      },
    },
    {
      id: 3,
      title: "Période de récupération",
      icon: RefreshCw,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      description: "Phase cruciale de retour à l'équilibre",
      detailedContent: {
        explanation:
          "Cette étape détermine si le stress reste adaptatif ou devient problématique. La récupération permet de restaurer l'homéostasie.",
        examples: [
          "Pause après résolution du problème",
          "Exercice physique décompressant",
          "Sommeil réparateur",
          "Activités relaxantes",
          "Socialisation positive",
        ],
        keyPoints: [
          "Diminution progressive des hormones de stress",
          "Retour au rythme cardiaque normal",
          "Restauration des réserves énergétiques",
        ],
      },
    },
    {
      id: 4,
      title: "Accumulation → Chronique",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      description: "Sans récupération, épuisement des ressources",
      detailedContent: {
        explanation:
          "L'absence de récupération mène à un état d'épuisement chronique où les ressources adaptatives s'amenuisent.",
        examples: [
          "Fatigue persistante",
          "Irritabilité chronique",
          "Troubles du sommeil",
          "Baisse de concentration",
          "Système immunitaire affaibli",
        ],
        keyPoints: [
          "Épuisement des réserves énergétiques",
          "Dérèglement hormonal persistant",
          "Impact sur la santé physique et mentale",
        ],
      },
    },
  ];

  // Auto-progress animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Évolution du stress
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprendre le passage du stress aigu au stress chronique
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-100"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-blue-200 to-red-300 transform -translate-y-1/2 z-0"></div>

          {/* Timeline steps */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="text-center">
                {/* Step circle */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full ${step.bgColor} ${step.borderColor} border-4 flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 ${
                    activeStep === step.id ? "scale-110 shadow-lg" : ""
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Step content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* Step number */}
                <div className="text-xs text-gray-400 font-medium">
                  Étape {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed panel */}
        {activeStep && (
          <Card className="mt-12 border-2 border-primary/20 shadow-xl">
            <CardContent className="p-8">
              {(() => {
                const step = timelineSteps.find((s) => s.id === activeStep);
                if (!step) return null;

                return (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center`}
                      >
                        <step.icon className={`w-6 h-6 ${step.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {step.detailedContent.explanation}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">
                          Exemples concrets :
                        </h4>
                        <ul className="space-y-2">
                          {step.detailedContent.examples.map((example, idx) => (
                            <li
                              key={idx}
                              className="text-blue-700 text-sm flex items-start"
                            >
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-3">
                          Points clés :
                        </h4>
                        <ul className="space-y-2">
                          {step.detailedContent.keyPoints.map((point, idx) => (
                            <li
                              key={idx}
                              className="text-green-700 text-sm flex items-start"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(null)}
                        className="mt-4"
                      >
                        Fermer les détails
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              La clé : une récupération efficace
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Pour éviter le passage au stress chronique, il est essentiel
              d'intégrer des moments de récupération réguliers dans votre
              quotidien professionnel.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-full text-gray-700 border border-gray-200">
                Sommeil de qualité
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-gray-700 border border-gray-200">
                Activité physique
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-gray-700 border border-gray-200">
                Techniques de relaxation
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-gray-700 border border-gray-200">
                Support social
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
