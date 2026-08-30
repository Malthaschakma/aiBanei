import { OpportunityCardSkeleton } from "@/components/opportunities/opportunity-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/section";

export default function ExploreLoading() {
  return (
    <Container size="wide" className="py-10">
      <Skeleton className="h-9 w-72" />
      <Skeleton className="mt-3 h-4 w-full max-w-lg" />
      <Skeleton className="mt-6 h-10 w-full max-w-xl" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_17rem]">
        <div className="hidden flex-col gap-6 lg:flex">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
            </div>
          ))}
        </div>

        <div className="min-w-0">
          <Skeleton className="h-9 w-full" />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {Array.from({ length: 6 }, (_, index) => (
              <OpportunityCardSkeleton key={index} />
            ))}
          </div>
        </div>

        <div className="hidden xl:block">
          <Skeleton className="h-56" />
        </div>
      </div>
    </Container>
  );
}
