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
import { useState } from "react";
import React from "react";
import StressEvolutionSection from "@/components/StressEvolutionSection";
import StressSelfAssessmentSection from "@/components/StressSelfAssessment";
import DidYouKnow from "@/components/DidYouKnow";
import FactTrigger from "@/components/FactTrigger";
import ScientificFacts from "@/components/ScientificFacts";
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
              Introduction au stress
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center">
              Le stress est une réaction universelle que chacun expérimente,
              qu'il soit sur le terrain, en bureau ou en management. Il ne
              s'agit pas seulement d'une émotion, mais d'un ensemble de réponses
              physiologiques, cognitives et comportementales que notre organisme
              met en place lorsqu'il perçoit une situation comme exigeante ou
              menaçante.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
      <QuizSection />

      {/* Micro-cas pratiques Section */}
      <MicroCasesSection />

      {/* Evolution du stress Section */}
      <StressEvolutionSection />

      {/* Self Assessment Section */}
      <StressSelfAssessmentSection />

      {/* Floating DidYouKnow sidebar */}
      <DidYouKnow mode="sidebar" trigger="auto" autoInterval={10000} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg">Module 1- comprendre le stress | FPSG 2025</p>
        </div>
      </footer>
    </div>
  );
}

function QuizSection() {
  const questions = [
    {
      id: 1,
      question: "Le stress est toujours néfaste pour l'organisme.",
      answer: false,
      explanation:
        "Faux. Le stress aigu peut être bénéfique et améliorer les performances. C'est le stress chronique qui devient délétère.",
    },
    {
      id: 2,
      question: "Le stress chronique épuise les ressources de l'organisme.",
      answer: true,
      explanation:
        "Vrai. Le stress prolongé maintient l'organisme en état d'alerte constant, ce qui épuise ses réserves énergétiques.",
    },
    {
      id: 3,
      question: "Les signaux d'alerte du stress sont uniquement physiques.",
      answer: false,
      explanation:
        "Faux. Le stress se manifeste par des signaux physiques, émotionnels, cognitifs et comportementaux.",
    },
    {
      id: 4,
      question:
        "Une présentation importante peut déclencher un stress aigu bénéfique.",
      answer: true,
      explanation:
        "Vrai. Cette situation mobilise les ressources pour améliorer la performance, c'est un stress adaptatif.",
    },
    {
      id: 5,
      question:
        "Nos traits de personnalité n'influencent pas notre réaction au stress.",
      answer: false,
      explanation:
        "Faux. Le perfectionnisme, la peur de l'erreur ou la faible tolérance à l'incertitude amplifient la réaction de stress.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: boolean | null;
  }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean) => {
    if (showFeedback[questionId]) return; // Prevent multiple answers

    const question = questions.find((q) => q.id === questionId);
    const isCorrect = question?.answer === answer;

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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quiz — Comprendre le stress
          </h2>
          <p className="text-lg text-gray-600">
            Testez vos connaissances avec ces questions Vrai/Faux
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
              <Button onClick={resetQuiz} className="mt-4">
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommencer
              </Button>
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
                ) : (
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
                      className={`${
                        userAnswers[question.id] === question.answer
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {question.explanation}
                    </p>
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
