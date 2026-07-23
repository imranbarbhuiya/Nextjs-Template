'use client';

import { LayoutDashboard, Package, Sparkles, Users, Settings, ScrollText } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';

const nav = [
	{
		label: 'Overview',
		items: [{ title: 'Dashboard', icon: LayoutDashboard, url: '#' }],
	},
	{
		label: 'Workspace',
		items: [
			{ title: 'Projects', icon: Package, url: '#' },
			{ title: 'Analytics', icon: Sparkles, url: '#' },
		],
	},
	{
		label: 'Administration',
		items: [
			{ title: 'Team', icon: Users, url: '#' },
			{ title: 'Activity', icon: ScrollText, url: '#' },
			{ title: 'Settings', icon: Settings, url: '#' },
		],
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2 py-1.5">
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<LayoutDashboard className="size-4" />
					</div>
					<span className="text-sm font-semibold">Next.js Template</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				{nav.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						<SidebarMenu>
							{group.items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton render={<a href={item.url} />} tooltip={item.title}>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
