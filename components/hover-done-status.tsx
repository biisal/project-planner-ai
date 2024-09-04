import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CheckCircle, Clock } from "lucide-react";

interface HoverDoneStatusProps {
  isdone?: boolean;
}
const HoverDoneStatus = ({ isdone }: HoverDoneStatusProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {isdone ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
      </HoverCardTrigger>
      <HoverCardContent className="bg-background">
        {isdone ? "This Project is Marked as Done" : "This Project is Pending"}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverDoneStatus;
