import { AppSidebar } from '@/components/app-sidebar';
import { LocaleDropdown } from '@/components/locale-dropdown';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ms-1" />
					<Separator className="me-2 h-4" orientation="vertical" />
					<h1 className="text-base font-semibold">Dashboard</h1>
					<div className="ms-auto flex items-center gap-2">
						<LocaleDropdown />
						<ModeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4" />
			</SidebarInset>
		</SidebarProvider>
	);
}
