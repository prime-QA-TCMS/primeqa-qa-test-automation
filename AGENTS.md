# Automation Agent Contract

## Architecture

This repository owns TCMS business test scenarios and orchestration. It consumes `@primeqa/qa-ui-engine` and `@primeqa/qa-api-engine`.

## Rules

- Do not add business test cases to either engine repository.
- Keep engine calls generic; put domain language in flows/clients/tests here.
- Prefer API setup where UI setup adds no validation value.
- Use cross-layer verification where it meaningfully proves integration behaviour.
- Never share mutable state between parallel tests.
- Generate unique test data and clean it up where practical.
- Never commit credentials, tokens, production PII, or production test data.
- Avoid brittle UI selectors; prefer stable `data-testid`/role-based locators.
- Avoid arbitrary sleeps; wait on observable conditions.
- Tests should state the user/business behaviour being proven, not implementation details.
- Classify scenarios with appropriate tags: `@smoke`, `@regression`, `@ui`, `@api`, `@cross-layer`.

## Recommended structure

- `tests/` — executable scenarios
- `src/fixtures/` — runner fixtures and shared scenario context
- `src/ui/` — TCMS-specific UI flows/page objects built on UI engine
- `src/api/` — TCMS-specific API clients built on API engine
- `src/data/` — builders/factories
- `src/assertions/` — reusable business assertions

## Cross-layer pattern

One scenario may create state through one engine and verify it through the other. Preserve identifiers/data through the test-scoped shared state fixture or explicit return values.
