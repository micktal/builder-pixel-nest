import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { 
  Brain, 
  Heart, 
  Clock, 
  Activity, 
  Wind,
  X,
  Lightbulb,
  ArrowRight,
  Info
} from "lucide-react";

interface Fact {
  id: string;
  title: string;
  content: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const facts: Fact[] = [
  {
    id: 'fact1',
    title: 'Impact sur le cerveau',
    content: 'Un niveau élevé de stress prolongé peut réduire le volume de l\'hippocampe, une zone clé de la mémoire.',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'fact2',
    title: 'Rythme cardiaque',
    content: 'Le cœur peut battre 20 à 30% plus vite lors d\'un stress aigu.',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    id: 'fact3',
    title: 'Risques de santé',
    content: 'Le stress chronique augmente le risque de maladies cardiovasculaires et de diabète.',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    id: 'fact4',
    title: 'Pouvoir de la respiration',
    content: 'Une minute de respiration profonde peut réduire significativement la tension artérielle.',
    icon: Wind,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'fact5',
    title: 'Micro-pauses efficaces',
    content: 'Les micro-pauses régulières améliorent la concentration et réduisent la fatigue mentale.',
    icon: Clock,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
];

interface DidYouKnowProps {
  mode?: 'sidebar' | 'popup' | 'inline';
  trigger?: 'click' | 'hover' | 'auto';
  autoInterval?: number;
  initialFactIndex?: number;
  onClose?: () => void;
}

export default function DidYouKnow({ 
  mode = 'sidebar', 
  trigger = 'auto',
  autoInterval = 8000 
}: DidYouKnowProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(mode === 'inline');
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-rotate facts
  useEffect(() => {
    if (trigger === 'auto' && isVisible) {
      const interval = setInterval(() => {
        setCurrentFactIndex(prev => (prev + 1) % facts.length);
      }, autoInterval);
      return () => clearInterval(interval);
    }
  }, [trigger, autoInterval, isVisible]);

  // Show component after initial delay
  useEffect(() => {
    if (mode === 'sidebar' && trigger === 'auto') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mode, trigger]);

  const currentFact = facts[currentFactIndex];

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleNext = () => {
    setCurrentFactIndex(prev => (prev + 1) % facts.length);
  };

  const handlePrevious = () => {
    setCurrentFactIndex(prev => (prev - 1 + facts.length) % facts.length);
  };

  if (!isVisible) return null;

  // Inline mode - embedded in content
  if (mode === 'inline') {
    return (
      <div className="my-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-xl font-bold text-blue-900">
                Le saviez-vous ?
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facts.slice(0, 3).map((fact, index) => (
                <div 
                  key={fact.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${fact.bgColor} rounded-full flex items-center justify-center mb-3`}>
                    <fact.icon className={`w-6 h-6 ${fact.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    {fact.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {fact.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" size="sm" onClick={handleExpand}>
                Voir plus de faits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sidebar mode - floating panel
  if (mode === 'sidebar') {
    return (
      <div 
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        role="complementary"
        aria-label="Informations contextuelles sur le stress"
      >
        <Card className="w-80 max-w-[calc(100vw-2rem)] border-2 border-blue-200 bg-white shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${currentFact.bgColor} rounded-full flex items-center justify-center`}>
                  <currentFact.icon className={`w-4 h-4 ${currentFact.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-blue-900">
                  Le saviez-vous ?
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {currentFact.title}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {currentFact.content}
              </p>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {facts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFactIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentFactIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Fait ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="sm" onClick={handlePrevious}>
                ←
              </Button>
              <span className="text-xs text-gray-500">
                {currentFactIndex + 1} / {facts.length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleNext}>
                →
              </Button>
            </div>
            
            <div className="text-center mt-3">
              <Button variant="outline" size="sm" onClick={handleExpand}>
                <Info className="w-3 h-3 mr-1" />
                Plus d'infos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Popup mode - modal overlay
  if (mode === 'popup') {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={handleClose}
      >
        <Card 
          className="w-full max-w-md border-2 border-blue-200 bg-white animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${currentFact.bgColor} rounded-full flex items-center justify-center`}>
                  <currentFact.icon className={`w-4 h-4 ${currentFact.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-blue-900">
                  Le saviez-vous ?
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-3">
                {currentFact.title}
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                {currentFact.content}
              </p>
              
              <div className="flex justify-center space-x-2 mb-4">
                {facts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFactIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentFactIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handlePrevious}>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" onClick={handleNext}>
                  Suivant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

// Expanded facts modal component
export function DidYouKnowExpanded({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-blue-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-blue-900">
              Faits & études sur le stress
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {facts.map((fact) => (
              <div 
                key={fact.id}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200"
              >
                <div className={`w-12 h-12 ${fact.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <fact.icon className={`w-6 h-6 ${fact.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {fact.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {fact.content}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              📚 Sources scientifiques
            </h3>
            <p className="text-yellow-700 text-sm">
              Ces informations sont basées sur des études en neurosciences, cardiologie et psychologie du travail. 
              Pour approfondir vos connaissances, consultez les recherches sur la neuroplasticité, 
              le système nerveux autonome et la psychophysiologie du stress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
