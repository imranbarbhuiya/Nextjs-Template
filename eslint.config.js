import query from '@tanstack/eslint-plugin-query';
import common from 'eslint-config-mahir/common';
import edge from 'eslint-config-mahir/edge';
import module from 'eslint-config-mahir/module';
import next from 'eslint-config-mahir/next';
import node from 'eslint-config-mahir/node';
import react from 'eslint-config-mahir/react';
import typescript from 'eslint-config-mahir/typescript';
import tailwind from 'eslint-config-mahir/tailwind';
import i18n from 'eslint-config-mahir/i18n';
import apiError from 'eslint-config-mahir/api-error';

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
	...query.configs['flat/recommended'],
	...i18n,
	...apiError,
	{
		ignores: ['.github', '.yarn', '.next', 'node_modules', 'next-env.d.ts'],
	},
];
