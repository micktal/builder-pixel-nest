import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
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
  RotateCcw
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: BookOpen,
      title: "Une réaction d'adaptation",
      description: "Contrairement à une idée reçue, le stress n'est pas toujours négatif. Il s'agit d'un mécanisme d'adaptation hérité de l'évolution : notre corps prépare une réponse rapide face à un danger ou un défi, mobilisant l'énergie nécessaire pour agir."
    },
    {
      icon: Users,
      title: "Stress aigu vs stress chronique",
      description: "On distingue le stress aigu, ponctuel et souvent bénéfique (présentation importante, gestion d'une urgence), et le stress chronique, prolongé et délétère, qui épuise l'organisme et altère la santé mentale et physique."
    },
    {
      icon: Award,
      title: "Les déclencheurs externes",
      description: "Le stress peut provenir de stimuli extérieurs : surcharge de travail, interruptions constantes, conflits interpersonnels, imprévus techniques, délais serrés… Ces déclencheurs activent la réponse de stress, parfois même avant que nous en ayons pleinement conscience."
    },
    {
      icon: Zap,
      title: "Les facteurs internes",
      description: "Nos pensées, croyances et traits de personnalité jouent un rôle important. Le perfectionnisme, la peur de l'erreur, la faible tolérance à l'incertitude ou encore une faible perception de contrôle peuvent amplifier la réaction de stress, même face à des situations relativement neutres."
    },
    {
      icon: Globe,
      title: "Les réactions physiologiques",
      description: "Lorsqu'une situation est perçue comme stressante, le cerveau déclenche la sécrétion d'hormones comme l'adrénaline et le cortisol. Ces substances augmentent la fréquence cardiaque, la tension artérielle et mobilisent les réserves d'énergie. Si cette activation perdure, elle devient nocive."
    },
    {
      icon: Headphones,
      title: "Les signaux d'alerte",
      description: "Le stress se manifeste par des signaux physiques (tensions musculaires, fatigue), émotionnels (irritabilité, anxiété), cognitifs (trous de mémoire, difficultés de concentration) et comportementaux (procrastination, isolement). Les identifier tôt permet d'agir avant que la situation ne s'aggrave."
    }
  ];

  const courses = [
    {
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      students: 2341,
      rating: 4.9,
      price: "$199",
      image: "/placeholder.svg",
      level: "Advanced",
      category: "Web Development"
    },
    {
      title: "UX Design Fundamentals",
      instructor: "Mike Chen",
      duration: "6 weeks", 
      students: 1876,
      rating: 4.8,
      price: "$149",
      image: "/placeholder.svg",
      level: "Beginner",
      category: "Design"
    },
    {
      title: "Data Science with Python",
      instructor: "Dr. Emily Davis",
      duration: "12 weeks",
      students: 3205,
      rating: 4.9,
      price: "$299",
      image: "/placeholder.svg",
      level: "Intermediate",
      category: "Data Science"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Module 1 – <span className="text-primary">Comprendre le stress</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Le stress est un signal, pas une condamnation. Apprenez à l'écouter avant qu'il ne crie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
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
              Le stress est une réaction universelle que chacun expérimente, qu'il soit sur le terrain,
              en bureau ou en management. Il ne s'agit pas seulement d'une émotion, mais d'un ensemble
              de réponses physiologiques, cognitives et comportementales que notre organisme met en place
              lorsqu'il perçoit une situation comme exigeante ou menaçante.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ce qui compte, ce n'est pas ce qui vous arrive, mais comment vous y répondez
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
                <CardTitle className="text-2xl font-bold text-green-700">Stress Aigu</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Caractéristiques :</h3>
                  <ul className="text-green-700 text-sm space-y-1 text-left">
                    <li>• Court terme et ponctuel</li>
                    <li>• Réaction normale et adaptative</li>
                    <li>• Mobilise les ressources</li>
                    <li>• Améliore les performances</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Exemples :</h3>
                  <p className="text-green-700 text-sm text-left">
                    Présentation importante, entretien d'embauche, gestion d'urgence,
                    examen médical, échéance serrée
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
                <CardTitle className="text-2xl font-bold text-red-700">Stress Chronique</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Caractéristiques :</h3>
                  <ul className="text-red-700 text-sm space-y-1 text-left">
                    <li>• Long terme et persistant</li>
                    <li>• Épuise les ressources</li>
                    <li>• Altère la santé physique et mentale</li>
                    <li>• Diminue les performances</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Conséquences :</h3>
                  <p className="text-red-700 text-sm text-left">
                    Burnout, troubles du sommeil, anxiété, dépression,
                    problèmes cardiovasculaires, affaiblissement immunitaire
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <QuizSection />

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white text-gray-900 hover:bg-white">
                    {course.level}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    by {course.instructor}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="text-2xl font-bold text-primary">{course.price}</div>
                  <Button size="sm" className="px-6">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your learning experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of educators and learners who are already creating amazing courses with ArticuLearn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ArticuLearn</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering educators and learners worldwide with cutting-edge e-learning technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ArticuLearn. All rights reserved.</p>
          </div>
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
      explanation: "Faux. Le stress aigu peut être bénéfique et améliorer les performances. C'est le stress chronique qui devient délétère."
    },
    {
      id: 2,
      question: "Le stress chronique épuise les ressources de l'organisme.",
      answer: true,
      explanation: "Vrai. Le stress prolongé maintient l'organisme en état d'alerte constant, ce qui épuise ses réserves énergétiques."
    },
    {
      id: 3,
      question: "Les signaux d'alerte du stress sont uniquement physiques.",
      answer: false,
      explanation: "Faux. Le stress se manifeste par des signaux physiques, émotionnels, cognitifs et comportementaux."
    },
    {
      id: 4,
      question: "Une présentation importante peut déclencher un stress aigu bénéfique.",
      answer: true,
      explanation: "Vrai. Cette situation mobilise les ressources pour améliorer la performance, c'est un stress adaptatif."
    },
    {
      id: 5,
      question: "Nos traits de personnalité n'influencent pas notre réaction au stress.",
      answer: false,
      explanation: "Faux. Le perfectionnisme, la peur de l'erreur ou la faible tolérance à l'incertitude amplifient la réaction de stress."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: boolean | null}>({});
  const [showFeedback, setShowFeedback] = useState<{[key: number]: boolean}>({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (questionId: number, answer: boolean) => {
    if (showFeedback[questionId]) return; // Prevent multiple answers

    const question = questions.find(q => q.id === questionId);
    const isCorrect = question?.answer === answer;

    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));

    if (isCorrect) {
      setScore(prev => prev + 1);
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
              style={{ width: `${(getAnsweredCount() / questions.length) * 100}%` }}
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
                Votre score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
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
            <Card key={question.id} className="border-2 border-gray-100 hover:border-primary/20 transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    Question {question.id}
                  </span>
                  {showFeedback[question.id] && (
                    <div className={`flex items-center ${
                      userAnswers[question.id] === question.answer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
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
                  <div className={`p-4 rounded-lg ${
                    userAnswers[question.id] === question.answer
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center mb-2">
                      {userAnswers[question.id] === question.answer ? (
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className={`font-semibold ${
                        userAnswers[question.id] === question.answer
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {userAnswers[question.id] === question.answer ? 'Correct !' : 'Incorrect'}
                      </span>
                    </div>
                    <p className={`${
                      userAnswers[question.id] === question.answer
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
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
