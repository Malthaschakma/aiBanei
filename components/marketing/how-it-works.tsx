import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    title: "Create",
    body: "Describe what you are trying to build. Aibanei structures it into an opportunity others can understand and assess, and tells you what is still missing.",
  },
  {
    step: "02",
    title: "Match",
    body: "We compare what you need against what people are looking for. Every match explains itself, so you know why someone was surfaced before you reach out.",
  },
  {
    step: "03",
    title: "Connect",
    body: "Express interest with a reason. Private conversation opens only once the other side accepts, which keeps inboxes worth reading.",
  },
  {
    step: "04",
    title: "Build",
    body: "Move from a conversation to a working relationship, with the evidence, documents and decisions kept in one place as things progress.",
  },
] as const;

function HowItWorks({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-px sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step) => (
        <li
          key={step.step}
          className="border-border flex flex-col gap-3 border-t pt-6"
        >
          <span className="tabular text-muted-foreground text-xs">
            {step.step}
          </span>
          <h3 className="font-display text-foreground text-lg font-semibold tracking-tight">
            {step.title}
          </h3>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-pretty">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export { HowItWorks };
