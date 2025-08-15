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
} from "lucide-react";

interface ScientificFact {
  id: string;
  title: string;
  shortText: string;
  fullText: string;
  source: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const scientificFacts: ScientificFact[] = [
  {
    id: "memory",
    title: "Impact sur la mémoire",
    shortText:
      "Des recherches montrent qu'un stress chronique peut réduire le volume de l'hippocampe, une zone clé pour la mémoire et l'apprentissage.",
    fullText:
      "L'hippocampe, structure essentielle pour la formation de nouveaux souvenirs, est particulièrement vulnérable au stress chronique. Les hormones de stress comme le cortisol peuvent endommager les neurones de cette région, entraînant une diminution de volume pouvant aller jusqu'à 20% dans les cas sévères.",
    source: "Lupien et al., 2009 - Nature Reviews Neuroscience",
    icon: Brain,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    gradientFrom: "from-purple-50",
    gradientTo: "to-indigo-50",
  },
  {
    id: "heart",
    title: "Effet sur le cœur",
    shortText:
      "Lors d'un stress aigu, le rythme cardiaque peut augmenter de 20 à 30% et la tension artérielle s'élever en quelques secondes.",
    fullText:
      "La réaction de stress active immédiatement le système nerveux sympathique, libérant adrénaline et noradrénaline. Ces hormones accélèrent le rythme cardiaque de 60-80 bpm au repos jusqu'à 100-120 bpm, et peuvent faire grimper la tension de 20-40 mmHg en moins de 30 secondes.",
    source: "American Heart Association, 2018 - Circulation Research",
    icon: Heart,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
    gradientFrom: "from-red-50",
    gradientTo: "to-pink-50",
  },
  {
    id: "immunity",
    title: "Influence sur l'immunité",
    shortText:
      "Le stress prolongé peut affaiblir la réponse immunitaire et rendre l'organisme plus vulnérable aux infections.",
    fullText:
      "Le stress chronique supprime la fonction des lymphocytes T et réduit la production d'anticorps. Les personnes stressées ont 2 à 3 fois plus de risques de développer un rhume et mettent 40% plus de temps à guérir des blessures.",
    source: "Cohen et al., 2012 - Psychological Science",
    icon: Shield,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    gradientFrom: "from-blue-50",
    gradientTo: "to-cyan-50",
  },
  {
    id: "metabolism",
    title: "Risques métaboliques",
    shortText:
      "Le stress chronique favorise la résistance à l'insuline, augmentant le risque de diabète de type 2.",
    fullText:
      "L'élévation prolongée du cortisol perturbe le métabolisme du glucose, créant une résistance à l'insuline. Les personnes soumises à un stress chronique présentent un risque 60% plus élevé de développer un diabète de type 2 dans les 10 ans.",
    source: "Hackett & Steptoe, 2017 - Psychoneuroendocrinology",
    icon: Droplet,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
    gradientFrom: "from-orange-50",
    gradientTo: "to-yellow-50",
  },
  {
    id: "breathing",
    title: "Respiration & relaxation",
    shortText:
      "Une minute de respiration profonde peut réduire significativement la fréquence cardiaque et la tension artérielle.",
    fullText:
      "La respiration diaphragmatique active le nerf vague, déclenchant la réponse parasympathique. En 60 à 90 secondes, elle peut réduire le rythme cardiaque de 10-15 bpm et la tension artérielle de 5-10 mmHg, tout en diminuant le cortisol de 15-25%.",
    source: "Jerath et al., 2015 - Medical Hypotheses",
    icon: Wind,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    gradientFrom: "from-green-50",
    gradientTo: "to-emerald-50",
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
