import common from 'eslint-config-mahir/common';
import edge from 'eslint-config-mahir/edge';
import module from 'eslint-config-mahir/module';
import next from 'eslint-config-mahir/next';
import node from 'eslint-config-mahir/node';
import react from 'eslint-config-mahir/react';
import typescript from 'eslint-config-mahir/typescript';
import tailwind from 'eslint-config-mahir/tailwind';

import localPlugin from './eslint-plugin-local.js';

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
export default [
	...common,
	...node,
	...typescript,
	...module,
	...react,
	...next,
	...edge,
	...tailwind,
	{
		plugins: {
			local: localPlugin,
		},
		rules: {
			'local/static-t-arguments': 'error',
			'local/no-t-as-parameter': 'error',
		},
	},
	{
		ignores: ['.github', '.yarn', '.next', 'node_modules', 'next-env.d.ts', 'public/*.js'],
	},
];
