import { Button } from "@/components/ui/button";
import { useState } from "react";
import DidYouKnow from "./DidYouKnow";
import { Info, Lightbulb } from "lucide-react";

interface FactTriggerProps {
  text: string;
  factIndex?: number;
  variant?: "button" | "icon" | "text";
  size?: "sm" | "md" | "lg";
}

export default function FactTrigger({
  text,
  factIndex = 0,
  variant = "button",
  size = "md",
}: FactTriggerProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (variant === "icon") {
    return (
      <>
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all duration-200"
          aria-label="Voir un fait intéressant"
          title="Voir un fait intéressant"
        >
          <Info className="w-4 h-4" />
        </button>

        {showPopup && (
          <DidYouKnow
            mode="popup"
            trigger="click"
            initialFactIndex={factIndex}
            onClose={handleClose}
          />
        )}
      </>
    );
  }

  if (variant === "text") {
    return (
      <>
        <span
          onClick={handleClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200 underline decoration-dotted"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
          <Lightbulb className="w-4 h-4 mr-1" />
          {text}
        </span>

        {showPopup && (
          <DidYouKnow
            mode="popup"
            trigger="click"
            initialFactIndex={factIndex}
            onClose={handleClose}
          />
        )}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleClick}
        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
      >
        <Lightbulb className="w-4 h-4 mr-2" />
        {text}
      </Button>

      {showPopup && (
        <DidYouKnow
          mode="popup"
          trigger="click"
          initialFactIndex={factIndex}
          onClose={handleClose}
        />
      )}
    </>
  );
}
