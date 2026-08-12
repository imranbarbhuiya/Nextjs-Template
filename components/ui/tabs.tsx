'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/** Shares one layout-animation id per list so the indicator slides between its own tabs. */
const TabsListContext = React.createContext<string | null>(null);

function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
			data-orientation={orientation}
			data-slot="tabs"
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	'group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
	{
		variants: {
			variant: {
				default: 'rounded-2xl bg-muted p-[3px] group-data-horizontal/tabs:h-8 group-data-vertical/tabs:p-1',
				line: 'gap-1 rounded-none bg-transparent p-[3px] group-data-horizontal/tabs:h-8',
				pill: 'flex-wrap gap-1 rounded-xl bg-muted/70 p-1 ring-1 ring-border/70 ring-inset',
				segmented: 'h-9 rounded-lg bg-muted p-1',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function TabsList({
	className,
	variant = 'default',
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	const id = React.useId();

	return (
		<TabsListContext.Provider value={id}>
			<TabsPrimitive.List
				className={cn(tabsListVariants({ variant }), className)}
				data-slot="tabs-list"
				data-variant={variant}
				{...props}
			/>
		</TabsListContext.Provider>
	);
}

const tabsTriggerVariants = cva(
	"relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					'h-[calc(100%-1px)] flex-1 rounded-2xl px-1.5 py-0.5 text-sm font-medium text-foreground/60 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:px-3 hover:text-foreground data-active:text-foreground',
				line: 'h-[calc(100%-1px)] flex-1 rounded-none px-1.5 py-0.5 text-sm font-medium text-foreground/60 hover:text-foreground data-active:text-foreground',
				pill: 'rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-active:text-foreground',
				segmented:
					'h-full rounded-md px-3 text-sm font-medium text-muted-foreground hover:text-foreground data-active:text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const indicatorVariants = cva('absolute inset-0', {
	variants: {
		variant: {
			default: 'rounded-2xl bg-background shadow-sm',
			line: 'top-auto h-0.5 rounded-none bg-foreground',
			pill: 'rounded-lg border border-border bg-card shadow-sm',
			segmented: 'rounded-md bg-background',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

function TabsTrigger({
	className,
	variant = 'default',
	children,
	...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof tabsTriggerVariants>) {
	const listId = React.useContext(TabsListContext);
	const reduceMotion = useReducedMotion();

	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			render={(renderProps, state) => {
				const { children: renderedChildren, ...rest } = renderProps;

				return (
					<button {...rest} className={cn(tabsTriggerVariants({ variant }), className)} type="button">
						{state.active && (
							<motion.span
								aria-hidden
								className={cn(indicatorVariants({ variant }))}
								layoutId={`tabs-indicator-${listId}`}
								transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }}
							/>
						)}
						<span className="relative">{renderedChildren}</span>
					</button>
				);
			}}
			{...props}
		>
			{children}
		</TabsPrimitive.Tab>
	);
}

function TabsContent({ className, children, ...props }: TabsPrimitive.Panel.Props) {
	const reduceMotion = useReducedMotion();

	return (
		<TabsPrimitive.Panel className={cn('flex-1 text-sm outline-none', className)} data-slot="tabs-content" {...props}>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={reduceMotion ? false : { opacity: 0, y: 4 }}
				transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
			>
				{children}
			</motion.div>
		</TabsPrimitive.Panel>
	);
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger };
