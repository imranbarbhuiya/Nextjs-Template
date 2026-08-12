import query from '@tanstack/eslint-plugin-query';
import apiError from 'eslint-config-mahir/api-error';
import common from 'eslint-config-mahir/common';
import edge from 'eslint-config-mahir/edge';
import i18n from 'eslint-config-mahir/i18n';
import module from 'eslint-config-mahir/module';
import next from 'eslint-config-mahir/next';
import node from 'eslint-config-mahir/node';
import react from 'eslint-config-mahir/react';
import tailwind from 'eslint-config-mahir/tailwind';
import typescript from 'eslint-config-mahir/typescript';

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
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.js'],
				},
			},
		},
	},
	{
		ignores: [
			'.github',
			'.yarn',
			'.next',
			'node_modules',
			'next-env.d.ts',
			'openapi/api.ts',
			'public/sw.js',
			'public/swe-worker*.js',
		],
	},
];
