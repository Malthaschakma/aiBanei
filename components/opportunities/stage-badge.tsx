import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { stageLabels, stageOrder, type Stage } from "@/types/taxonomy";

const totalStages = Object.keys(stageOrder).length;

/**
 * Stage with a small progress rail. The rail communicates position along
 * idea → growth without needing a legend, and does not rely on colour alone.
 */
function StageBadge({
  stage,
  showRail = true,
  className,
}: {
  stage: Stage;
  showRail?: boolean;
  className?: string;
}) {
  const position = stageOrder[stage];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Badge variant="outline" size="sm">
        {stageLabels[stage]}
      </Badge>
      {showRail ? (
        <span
          className="flex items-center gap-0.5"
          aria-hidden
          title={`Stage ${position + 1} of ${totalStages}`}
        >
          {Array.from({ length: totalStages }, (_, index) => (
            <span
              key={index}
              className={cn(
                "h-0.5 w-2 rounded-full",
                index <= position ? "bg-foreground" : "bg-border",
              )}
            />
          ))}
        </span>
      ) : null}
    </span>
  );
}

export { StageBadge };
