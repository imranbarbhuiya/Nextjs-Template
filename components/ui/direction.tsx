'use client';

import { DirectionProvider as BaseDirectionProvider } from '@base-ui/react/direction-provider';
import * as React from 'react';

function DirectionProvider({
	dir,
	direction,
	children,
	...props
}: Omit<React.ComponentProps<typeof BaseDirectionProvider>, 'direction'> & {
	readonly dir?: React.ComponentProps<typeof BaseDirectionProvider>['direction'];
	readonly direction?: React.ComponentProps<typeof BaseDirectionProvider>['direction'];
}) {
	return (
		<BaseDirectionProvider direction={direction ?? dir ?? 'ltr'} {...props}>
			{children}
		</BaseDirectionProvider>
	);
}

export { DirectionProvider };

export { useDirection } from '@base-ui/react/direction-provider';
