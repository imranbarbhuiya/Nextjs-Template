---
applyTo: '**/*.tsx'
---

# Forms

- **Zod 4** for schema validation, wired through `zodResolver` from `@hookform/resolvers/zod`
- **React Hook Form** for state; use `Controller` for field-level control of non-native inputs
- Custom `Field`, `FieldLabel`, `FieldError`, `FieldDescription` components from `@/components/ui/field`

```tsx
const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Enter a valid email'),
});

type Values = z.infer<typeof schema>;

const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '' } });
```

## Rules

- Define the schema once and derive the form type with `z.infer` — never hand-write a parallel interface
- Always pass `defaultValues` so inputs stay controlled
- Validation messages are user-facing copy: wrap them with `t('...')` (see [i18n](i18n.md))
- Render errors through `FieldError`, not ad-hoc `<p>` tags
- For multi-step wizards, keep one form instance across steps and validate per step with `form.trigger(fieldNames)` rather than creating a form per step
- Share the form across step/section components with `FormProvider` + `useFormContext`/`useController` — never thread values and change handlers down as props

## Numeric fields

**Hold numeric input as a string in form state and allow the empty string.** Binding a `number` to an input means clearing it produces `NaN`, and a `0`/`1` fallback re-fills the box on every keystroke — the user cannot backspace to type a new value.

- Use `inputMode="numeric"` on a text input, not `type="number"`
- Never use `valueAsNumber`, and never default a numeric field to `0` or `1` in `defaultValues` — default to `''`
- Validate with `z.string()` plus a numeric refinement, and coerce to a number only at submit time
- The same applies to nuqs: `parseAsInteger.withDefault(n)` is fine for state driven by buttons or links, but do not bind it directly to a text input
