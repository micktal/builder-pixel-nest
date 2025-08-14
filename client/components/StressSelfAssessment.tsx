import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  dimension: "habits" | "physical" | "emotional" | "cognitive";
}

interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  level: "low" | "moderate" | "high";
  dimensionScores: Record<string, number>;
  highestDimension: string;
  feedback: string;
  advice: string[];
}

const questions: Question[] = [
  {
    id: "q1",
    text: "Je travaille souvent avec des interruptions qui me coupent dans ma tâche.",
    dimension: "habits",
  },
  {
    id: "q2",
    text: "Je peine à déconnecter après la journée (messages tardifs, ruminations).",
    dimension: "habits",
  },
  {
    id: "q3",
    text: "Je sacrifie mes pauses/repas pour avancer dans mon travail.",
    dimension: "habits",
  },
  {
    id: "q4",
    text: "Je ressens des tensions musculaires ou maux de tête.",
    dimension: "physical",
  },
  {
    id: "q5",
    text: "Mon sommeil est perturbé ou non réparateur.",
    dimension: "physical",
  },
  {
    id: "q6",
    text: "Je sens mon cœur s'accélérer face aux imprévus.",
    dimension: "physical",
  },
  {
    id: "q7",
    text: "Je me sens irritable, à fleur de peau, ou anxieux(se).",
    dimension: "emotional",
  },
  {
    id: "q8",
    text: "Je me décourage plus vite qu'avant.",
    dimension: "emotional",
  },
  {
    id: "q9",
    text: "J'ai du mal à me concentrer ou j'oublie des choses.",
    dimension: "cognitive",
  },
  {
    id: "q10",
    text: 'Je me surprends à penser "je n\'y arriverai pas".',
    dimension: "cognitive",
  },
];

const likertScale = [
  { value: 0, label: "Jamais" },
  { value: 1, label: "Parfois" },
  { value: 2, label: "Souvent" },
  { value: 3, label: "Très souvent" },
];

const dimensionLabels = {
  habits: "Habitudes de travail",
  physical: "Signaux physiques",
  emotional: "Signaux émotionnels",
  cognitive: "Signaux cognitifs",
};

export default function StressSelfAssessmentSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("stress-assessment");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setAnswers(data.answers || {});
        setCurrentQuestion(data.currentQuestion || 0);
        setIsCompleted(data.isCompleted || false);
        setShowResults(data.showResults || false);
      } catch (e) {
        console.error("Error loading saved assessment:", e);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const data = {
      answers,
      currentQuestion,
      isCompleted,
      showResults,
    };
    localStorage.setItem("stress-assessment", JSON.stringify(data));
  }, [answers, currentQuestion, isCompleted, showResults]);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateResults = (): AssessmentResult => {
    const totalScore = Object.values(answers).reduce(
      (sum, score) => sum + score,
      0,
    );
    const maxScore = questions.length * 3;

    let level: "low" | "moderate" | "high";
    if (totalScore <= 7) level = "low";
    else if (totalScore <= 16) level = "moderate";
    else level = "high";

    // Calculate dimension scores
    const dimensionScores: Record<string, number> = {};
    Object.values(dimensionLabels).forEach((dim) => {
      dimensionScores[dim] = 0;
    });

    questions.forEach((question) => {
      const score = answers[question.id] || 0;
      const dimLabel = dimensionLabels[question.dimension];
      dimensionScores[dimLabel] += score;
    });

    // Find highest dimension
    const highestDimension = Object.entries(dimensionScores).reduce(
      (max, [dim, score]) =>
        score > max.score ? { dimension: dim, score } : max,
      { dimension: "", score: -1 },
    ).dimension;

    // Generate feedback and advice
    let feedback = "";
    let advice: string[] = [];

    switch (level) {
      case "low":
        feedback =
          "Votre niveau de stress semble faible. Vous gérez bien la pression au quotidien.";
        advice = [
          "Maintenez vos bonnes habitudes actuelles",
          "Continuez à prendre des pauses régulières",
          "Restez vigilant aux signaux de votre corps",
        ];
        break;
      case "moderate":
        feedback =
          "Votre niveau de stress est modéré. Il est temps de mettre en place des stratégies préventives.";
        advice = [
          "Planifiez des micro-pauses de 5 minutes toutes les heures",
          "Pratiquez des exercices de respiration guidée",
          "Bloquez des créneaux sans interruptions pour vos tâches importantes",
          "Établissez des limites claires entre vie pro et perso",
        ];
        break;
      case "high":
        feedback =
          "Votre niveau de stress est élevé. Il est important d'agir rapidement pour votre bien-être.";
        advice = [
          "Priorisez vos tâches et déléguez si possible",
          "Instaurez une routine de déconnexion en fin de journée",
          "Améliorez votre hygiène de sommeil",
          "Considérez une conversation avec votre manager ou RH",
          "N'hésitez pas à consulter un professionnel si nécessaire",
        ];
        break;
    }

    // Add dimension-specific advice
    if (highestDimension === "Signaux cognitifs") {
      advice.push("Organisez votre travail par blocs de temps concentrés");
      advice.push("Utilisez des listes courtes et limitez les notifications");
    } else if (highestDimension === "Habitudes de travail") {
      advice.push(
        "Réorganisez votre environnement pour limiter les interruptions",
      );
      advice.push("Négociez des créneaux de concentration avec vos collègues");
    }

    return {
      totalScore,
      maxScore,
      level,
      dimensionScores,
      highestDimension,
      feedback,
      advice: advice.slice(0, 5), // Limit to 5 advice points
    };
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsCompleted(false);
    setShowResults(false);
    localStorage.removeItem("stress-assessment");
  };

  const handleDownloadResults = () => {
    const results = calculateResults();
    const date = new Date().toLocaleDateString("fr-FR");

    const content = `
AUTO-ÉVALUATION DU STRESS
Date: ${date}

RÉSULTATS:
Score total: ${results.totalScore}/${results.maxScore}
Niveau: ${results.level === "low" ? "Faible" : results.level === "moderate" ? "Modéré" : "Élevé"}

SCORES PAR DIMENSION:
${Object.entries(results.dimensionScores)
  .map(([dim, score]) => `${dim}: ${score}/9`)
  .join("\n")}

FEEDBACK:
${results.feedback}

CONSEILS PERSONNALISÉS:
${results.advice.map((advice, i) => `${i + 1}. ${advice}`).join("\n")}

DISCLAIMER:
Cet outil est destiné à l'auto-repérage et ne constitue pas un diagnostic médical.
En cas de détresse importante, consultez un professionnel de la santé.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auto-evaluation-stress-${date.replace(/\//g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "moderate":
        return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case "high":
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-700 bg-green-50 border-green-200";
      case "moderate":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "high":
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  if (showResults) {
    const results = calculateResults();

    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vos résultats d'auto-évaluation
            </h2>
            <p className="text-lg text-gray-600">
              Voici votre profil de stress personnalisé
            </p>
          </div>

          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {getLevelIcon(results.level)}
                <h3 className="text-2xl font-bold">
                  Niveau de stress:{" "}
                  {results.level === "low"
                    ? "Faible"
                    : results.level === "moderate"
                      ? "Modéré"
                      : "Élevé"}
                </h3>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {results.totalScore}/{results.maxScore}
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`p-4 rounded-lg border ${getLevelColor(results.level)} mb-6`}
              >
                <p className="text-center font-medium">{results.feedback}</p>
              </div>

              {/* Dimension Scores */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <h4 className="md:col-span-2 text-lg font-semibold mb-4">
                  Scores par dimension :
                </h4>
                {Object.entries(results.dimensionScores).map(
                  ([dimension, score]) => (
                    <div
                      key={dimension}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{dimension}</span>
                      <span
                        className={`font-bold ${dimension === results.highestDimension ? "text-red-600" : "text-gray-700"}`}
                      >
                        {score}/9
                      </span>
                    </div>
                  ),
                )}
              </div>

              {/* Advice */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">
                  Conseils personnalisés :
                </h4>
                <ul className="space-y-2">
                  {results.advice.map((advice, index) => (
                    <li key={index} className="flex items-start text-blue-800">
                      <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {advice}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  onClick={handleDownloadResults}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger les résultats
                </Button>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Revoir mes réponses
                </Button>
                <Button className="flex-1">Continuer le module</Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
            <p className="font-medium mb-2">⚠️ Important :</p>
            <p>
              Cet outil est destiné à l'auto-repérage et ne constitue pas un
              diagnostic médical. En cas de détresse importante ou persistante,
              n'hésitez pas à consulter un professionnel de la santé.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Mon niveau de stress – auto-bilan
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Évaluez votre niveau de stress actuel en répondant à ces questions
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            Temps estimé : 3-5 minutes
          </div>
        </div>

        {!isCompleted ? (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-primary">
                  Question {currentQuestion + 1} sur {questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {getAnsweredCount()}/{questions.length} réponses
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="mb-4" />
              <CardTitle className="text-xl leading-relaxed">
                {questions[currentQuestion].text}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-8">
                {likertScale.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50 ${
                      answers[questions[currentQuestion].id] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option.value}
                      checked={
                        answers[questions[currentQuestion].id] === option.value
                      }
                      onChange={() =>
                        handleAnswer(
                          questions[currentQuestion].id,
                          option.value,
                        )
                      }
                      className="sr-only"
                      aria-label={option.label}
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                        answers[questions[currentQuestion].id] === option.value
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[questions[currentQuestion].id] ===
                        option.value && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Précédent
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={
                    answers[questions[currentQuestion].id] === undefined
                  }
                  className="flex items-center"
                >
                  {currentQuestion === questions.length - 1
                    ? "Terminer"
                    : "Suivant"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center border-2 border-primary/20">
            <CardContent className="py-12">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Évaluation terminée !
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Découvrez votre profil de stress personnalisé et nos conseils
                adaptés.
              </p>
              <Button onClick={handleShowResults} size="lg" className="px-8">
                Voir mes résultats
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
