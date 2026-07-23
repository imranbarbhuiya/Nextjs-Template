import common from 'eslint-config-mahir/common';
import edge from 'eslint-config-mahir/edge';
import module from 'eslint-config-mahir/module';
import next from 'eslint-config-mahir/next';
import node from 'eslint-config-mahir/node';
import react from 'eslint-config-mahir/react';
import typescript from 'eslint-config-mahir/typescript';
import tailwind from 'eslint-config-mahir/tailwind';

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
		ignores: ['.github', '.yarn', '.next', 'node_modules', 'next-env.d.ts'],
	},
];
