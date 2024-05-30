import React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  title: string;
  loadingTitle: string;
  isLoading: boolean;
  styling?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  title,
  loadingTitle,
  isLoading,
  styling,
}) => {
  return (
    <Button
      type="submit"
      className={styling}
      size="lg"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {loadingTitle}
        </span>
      ) : (
        title
      )}
    </Button>
  );
};

export default LoadingButton;
