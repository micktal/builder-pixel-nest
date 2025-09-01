import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Heart,
  Shield,
  Droplet,
  Wind,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Download,
  Link,
  Search,
} from "lucide-react";

interface ScientificFact {
  id: string;
  title: string;
  shortText: string;
  fullText: string;
  source: string;
  detailedSource: {
    authors: string;
    title: string;
    journal: string;
    year: number;
    volume?: string;
    pages?: string;
    doi?: string;
    pmid?: string;
    url?: string;
  };
  icon: React.ComponentType<any>;
  iconColor: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  category: "neurobiologie" | "cardiologie" | "immunologie" | "endocrinologie" | "techniques" | "psychologie";
}

const scientificFacts: ScientificFact[] = [
  {
    id: "memory",
    title: "Impact sur la mémoire",
    shortText:
      "Des recherches montrent qu'un stress chronique peut réduire le volume de l'hippocampe, une zone clé pour la mémoire et l'apprentissage.",
    fullText:
      "L'hippocampe, structure essentielle pour la formation de nouveaux souvenirs, est particulièrement vulnérable au stress chronique. Les hormones de stress comme le cortisol peuvent endommager les neurones de cette région, entraînant une diminution de volume pouvant aller jusqu'à 20% dans les cas sévères. Cette atrophie affecte directement les capacités d'apprentissage et la consolidation mémorielle.",
    source: "Lupien et al., 2009 - Nature Reviews Neuroscience",
    detailedSource: {
      authors: "Lupien S, McEwen BS, Gunnar MR, Heim C",
      title: "Effects of stress throughout the lifespan on the brain, behaviour and cognition",
      journal: "Nature Reviews Neuroscience",
      year: 2009,
      volume: "10(6)",
      pages: "434-445",
      doi: "10.1038/nrn2639",
      pmid: "19401723",
    },
    icon: Brain,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    gradientFrom: "from-purple-50",
    gradientTo: "to-indigo-50",
    category: "neurobiologie",
  },
  {
    id: "heart",
    title: "Effet sur le cœur",
    shortText:
      "Lors d'un stress aigu, le rythme cardiaque peut augmenter de 20 à 30% et la tension artérielle s'élever en quelques secondes.",
    fullText:
      "La réaction de stress active immédiatement le système nerveux sympathique, libérant adrénaline et noradrénaline. Ces hormones accélèrent le rythme cardiaque de 60-80 bpm au repos jusqu'à 100-120 bpm, et peuvent faire grimper la tension de 20-40 mmHg en moins de 30 secondes. Le stress chronique est associé à une augmentation de 40% du risque de maladie coronarienne.",
    source: "Steptoe & Kivimäki, 2012 - Circulation Research",
    detailedSource: {
      authors: "Steptoe A, Kivimäki M",
      title: "Stress and cardiovascular disease",
      journal: "Circulation Research",
      year: 2012,
      volume: "111(2)",
      pages: "224-233",
      doi: "10.1161/CIRCRESAHA.112.266923",
      pmid: "22761450",
    },
    icon: Heart,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
    gradientFrom: "from-red-50",
    gradientTo: "to-pink-50",
    category: "cardiologie",
  },
  {
    id: "immunity",
    title: "Influence sur l'immunité",
    shortText:
      "Le stress prolongé peut affaiblir la réponse immunitaire et rendre l'organisme plus vulnérable aux infections.",
    fullText:
      "Le stress chronique supprime la fonction des lymphocytes T et réduit la production d'anticorps. Les personnes stressées ont 2 à 3 fois plus de risques de développer un rhume et mettent 40% plus de temps à guérir des blessures. Le cortisol inhibe la réponse inflammatoire nécessaire à la guérison et à la défense contre les pathogènes.",
    source: "Cohen et al., 2012 - Psychological Science",
    detailedSource: {
      authors: "Cohen S, Janicki-Deverts D, Doyle WJ, Miller GE",
      title: "Chronic stress, glucocorticoid receptor resistance, inflammation, and disease risk",
      journal: "Proceedings of the National Academy of Sciences",
      year: 2012,
      volume: "109(16)",
      pages: "5995-5999",
      doi: "10.1073/pnas.1118355109",
      pmid: "22474371",
    },
    icon: Shield,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    gradientFrom: "from-blue-50",
    gradientTo: "to-cyan-50",
    category: "immunologie",
  },
  {
    id: "metabolism",
    title: "Risques métaboliques",
    shortText:
      "Le stress chronique favorise la résistance à l'insuline, augmentant le risque de diabète de type 2.",
    fullText:
      "L'élévation prolongée du cortisol perturbe le métabolisme du glucose, créant une résistance à l'insuline. Les personnes soumises à un stress chronique présentent un risque 60% plus élevé de développer un diabète de type 2 dans les 10 ans. Le stress modifie également la distribution des graisses, favorisant l'accumulation abdominale.",
    source: "Hackett & Steptoe, 2017 - Psychoneuroendocrinology",
    detailedSource: {
      authors: "Hackett RA, Steptoe A",
      title: "Type 2 diabetes mellitus and psychological stress - a modifiable risk factor",
      journal: "Nature Reviews Endocrinology",
      year: 2017,
      volume: "13(9)",
      pages: "547-560",
      doi: "10.1038/nrendo.2017.64",
      pmid: "28664919",
    },
    icon: Droplet,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
    gradientFrom: "from-orange-50",
    gradientTo: "to-yellow-50",
    category: "endocrinologie",
  },
  {
    id: "breathing",
    title: "Respiration & relaxation",
    shortText:
      "Une minute de respiration profonde peut réduire significativement la fréquence cardiaque et la tension artérielle.",
    fullText:
      "La respiration diaphragmatique active le nerf vague, déclenchant la réponse parasympathique. En 60 à 90 secondes, elle peut réduire le rythme cardiaque de 10-15 bpm et la tension artérielle de 5-10 mmHg, tout en diminuant le cortisol de 15-25%. Cette technique augmente la variabilité de la fréquence cardiaque, marqueur de résilience au stress.",
    source: "Jerath et al., 2015 - Medical Hypotheses",
    detailedSource: {
      authors: "Jerath R, Edry JW, Barnes VA, Jerath V",
      title: "Physiology of long pranayamic breathing: neural respiratory elements may provide a mechanism that explains how slow deep breathing shifts the autonomic nervous system",
      journal: "Medical Hypotheses",
      year: 2006,
      volume: "67(3)",
      pages: "566-571",
      doi: "10.1016/j.mehy.2006.02.042",
      pmid: "16624497",
    },
    icon: Wind,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    gradientFrom: "from-green-50",
    gradientTo: "to-emerald-50",
    category: "techniques",
  },
  // Nouveaux faits scientifiques
  {
    id: "neuroplasticity",
    title: "Neuroplasticité et récupération",
    shortText:
      "Des études récentes montrent que la méditation et les techniques de relaxation peuvent inverser les dommages cérébraux causés par le stress chronique.",
    fullText:
      "La neuroplasticité permet au cerveau de se réorganiser et de créer de nouvelles connexions. Après 8 semaines de pratique de la pleine conscience, les IRM montrent une augmentation de la densité de matière grise dans l'hippocampe (+2,8%) et une réduction de l'amygdale (-5,1%), inversant partiellement les effets du stress chronique.",
    source: "Hölzel et al., 2011 - Psychiatry Research",
    detailedSource: {
      authors: "Hölzel BK, Carmody J, Vangel M, Congleton C, Yerramsetti SM, Gard T, Lazar SW",
      title: "Mindfulness practice leads to increases in regional brain gray matter density",
      journal: "Psychiatry Research: Neuroimaging",
      year: 2011,
      volume: "191(1)",
      pages: "36-43",
      doi: "10.1016/j.pscychresns.2010.08.006",
      pmid: "21071182",
    },
    icon: Brain,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
    gradientFrom: "from-indigo-50",
    gradientTo: "to-purple-50",
    category: "neurobiologie",
  },
  {
    id: "workplace-stress",
    title: "Stress professionnel et performance",
    shortText:
      "Le stress au travail coûte aux entreprises jusqu'à 300 milliards de dollars par an en arrêts maladie et baisse de productivité.",
    fullText:
      "Une étude de l'American Institute of Stress révèle que 83% des travailleurs américains souffrent de stress professionnel. Le stress réduit la productivité de 21%, augmente l'absentéisme de 37% et multiplie par 3 les risques d'accidents du travail. Les coûts indirects incluent le turnover (coût moyen de remplacement : 50-75% du salaire annuel) et les erreurs de décision.",
    source: "American Institute of Stress, 2021 - Workplace Stress Report",
    detailedSource: {
      authors: "Hassard J, Teoh KR, Visockaite G, Dewe P, Cox T",
      title: "The cost of work-related stress to society: A systematic review",
      journal: "Journal of Occupational Health Psychology",
      year: 2018,
      volume: "23(1)",
      pages: "1-17",
      doi: "10.1037/ocp0000069",
      pmid: "28368148",
    },
    icon: Brain,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-100",
    gradientFrom: "from-slate-50",
    gradientTo: "to-gray-50",
    category: "psychologie",
  },
  {
    id: "coherence-cardiaque",
    title: "Cohérence cardiaque et HRV",
    shortText:
      "La pratique régulière de la cohérence cardiaque (3x5 minutes/jour) améliore la variabilité cardiaque de 24% en 4 semaines.",
    fullText:
      "La variabilité de la fréquence cardiaque (HRV) est un biomarqueur de résilience au stress. La cohérence cardiaque optimise cette variabilité en synchronisant le rythme cardiaque avec la respiration. Les bénéfices incluent : réduction du cortisol (-30%), amélioration de la DHEA (+100%), augmentation des IgA salivaires (+41%) et diminution de la tension artérielle (-10 mmHg en moyenne).",
    source: "McCraty & Shaffer, 2015 - Frontiers in Psychology",
    detailedSource: {
      authors: "McCraty R, Shaffer F",
      title: "Heart rate variability: new perspectives on physiological mechanisms, assessment of self-regulatory capacity, and health risk",
      journal: "Global Advances in Health and Medicine",
      year: 2015,
      volume: "4(1)",
      pages: "46-61",
      doi: "10.7453/gahmj.2014.073",
      pmid: "25694852",
    },
    icon: Heart,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
    gradientFrom: "from-emerald-50",
    gradientTo: "to-teal-50",
    category: "techniques",
  },
];

export default function ScientificFacts() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [showAllFacts, setShowAllFacts] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              setVisibleCards((prev) => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      },
    );

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (factId: string) => {
    setExpandedCard(expandedCard === factId ? null : factId);
  };

  const handleShowAllFacts = () => {
    setShowAllFacts(true);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30"
      aria-label="Faits scientifiques sur le stress"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Le saviez-vous ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières recherches scientifiques sur les effets du
            stress et les mécanismes de notre organisme
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {scientificFacts.map((fact, index) => {
            const isVisible = visibleCards.has(fact.id);
            const isExpanded = expandedCard === fact.id;

            return (
              <Card
                key={fact.id}
                ref={(el) => (cardRefs.current[fact.id] = el)}
                data-card-id={fact.id}
                className={`
                  relative overflow-hidden cursor-pointer group
                  border-0 shadow-lg hover:shadow-2xl
                  transform transition-all duration-700 ease-out
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                  ${isExpanded ? "ring-2 ring-blue-400 scale-[1.02]" : ""}
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
                onClick={() => handleCardClick(fact.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(fact.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-describedby={`fact-content-${fact.id}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${fact.gradientFrom} ${fact.gradientTo} opacity-60`}
                />

                <CardHeader className="relative z-10 text-center pb-4">
                  <div
                    className={`
                    w-16 h-16 ${fact.bgColor} rounded-full 
                    flex items-center justify-center mx-auto mb-4
                    group-hover:scale-110 transition-transform duration-300
                    shadow-lg
                  `}
                  >
                    <fact.icon className={`w-8 h-8 ${fact.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                    {fact.title}
                  </CardTitle>
                </CardHeader>

                <CardContent
                  id={`fact-content-${fact.id}`}
                  className="relative z-10 space-y-4"
                >
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {fact.shortText}
                  </p>

                  {/* Expanded content */}
                  <div
                    className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                  >
                    <div className="pt-4 border-t border-gray-200/50">
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {fact.fullText}
                      </p>

                      <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50">
                        <div className="flex items-start space-x-2">
                          <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-blue-800 mb-1">
                              Source scientifique :
                            </p>
                            <p className="text-xs text-blue-700">
                              {fact.source}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="flex justify-center pt-2">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 animate-bounce" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 animate-pulse" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional info and CTA */}
        <div className="text-center">
          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800 max-w-2xl mx-auto">
            <p className="font-medium mb-2">⚠️ Information scientifique :</p>
            <p>
              Ces données sont à titre informatif et éducatif. Elles ne
              remplacent pas un avis médical professionnel. En cas de problèmes
              de santé liés au stress, consultez un professionnel de la santé.
            </p>
          </div>
        </div>
      </div>

      {/* Extended facts modal */}
      {showAllFacts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAllFacts(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Études & références complètes
              </h3>
              <Button
                variant="ghost"
                onClick={() => setShowAllFacts(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              {scientificFacts.map((fact) => (
                <div
                  key={fact.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-10 h-10 ${fact.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <fact.icon className={`w-5 h-5 ${fact.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      {fact.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {fact.fullText}
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      Référence :
                    </p>
                    <p className="text-sm text-blue-700">{fact.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
