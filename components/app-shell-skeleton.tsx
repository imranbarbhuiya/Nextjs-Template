import { Skeleton } from '@/components/ui/skeleton';

const NAV_ITEMS = 5;
const CARDS = 4;

/** Mirrors the sidebar + header + content layout so the shell does not shift once the session resolves. */
export function AppShellSkeleton() {
	return (
		<div aria-busy aria-live="polite" className="flex min-h-dvh w-full">
			<aside className="hidden w-64 shrink-0 flex-col border-e border-sidebar-border bg-sidebar md:flex">
				<div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border/70 px-5">
					<Skeleton className="size-9 shrink-0 rounded-full" />
					<Skeleton className="h-4 w-32" />
				</div>
				<div className="flex flex-col gap-1 px-3 py-5">
					{Array.from({ length: NAV_ITEMS }, (_, index) => (
						<div className="flex items-center gap-3 rounded-xl px-3 py-2.5" key={index}>
							<Skeleton className="size-4 shrink-0 rounded" />
							<Skeleton className="h-3.5" style={{ width: `${50 + ((index * 17) % 35)}%` }} />
						</div>
					))}
				</div>
			</aside>
			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6">
					<Skeleton className="size-8 rounded-lg md:hidden" />
					<Skeleton className="h-8 w-full max-w-md rounded-2xl" />
					<div className="ms-auto flex items-center gap-2">
						<Skeleton className="size-8 rounded-lg" />
						<Skeleton className="size-8 rounded-lg" />
						<Skeleton className="size-8 rounded-lg" />
						<Skeleton className="size-8 rounded-full" />
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-6 p-6">
					<Skeleton className="h-7 w-48" />
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{Array.from({ length: CARDS }, (_, index) => (
							<Skeleton className="h-28 rounded-2xl" key={index} />
						))}
					</div>
					<Skeleton className="h-64 flex-1 rounded-2xl" />
				</main>
			</div>
		</div>
	);
}
