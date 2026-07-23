/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
	meta: {
		name: 'eslint-plugin-local',
		version: '1.0.0',
	},
	rules: {
		'static-t-arguments': {
			meta: {
				type: 'problem',
				docs: {
					description:
						'Require t() calls to use static string literals so next-intl can extract messages at build time',
				},
				schema: [],
				messages: {
					staticArgument:
						'`t()` must receive a static string literal. Dynamic expressions cannot be extracted by next-intl. Use separate `t("Key")` calls instead.',
				},
			},
			create(context) {
				return {
					CallExpression(node) {
						if (node.callee.type !== 'Identifier' || node.callee.name !== 't') return;
						if (node.arguments.length === 0) return;
						const firstArg = node.arguments[0];
						if (firstArg.type !== 'Literal' || typeof firstArg.value !== 'string')
							context.report({ node: firstArg, messageId: 'staticArgument' });
					},
				};
			},
		},
		'no-t-as-parameter': {
			meta: {
				type: 'problem',
				docs: {
					description: 'Disallow passing the `t` translation function as an argument to other functions or components',
				},
				schema: [],
				messages: {
					noTParam:
						'Do not pass `t` as an argument. Call `useExtracted()` or `getExtracted()` directly in the consuming component/function instead.',
				},
			},
			create(context) {
				return {
					CallExpression(node) {
						for (const arg of node.arguments)
							if (arg.type === 'Identifier' && arg.name === 't') context.report({ node: arg, messageId: 'noTParam' });
					},
					JSXAttribute(node) {
						if (
							node.value?.type === 'JSXExpressionContainer' &&
							node.value.expression.type === 'Identifier' &&
							node.value.expression.name === 't'
						)
							context.report({ node: node.value.expression, messageId: 'noTParam' });
					},
				};
			},
		},
	},
};

export default plugin;
