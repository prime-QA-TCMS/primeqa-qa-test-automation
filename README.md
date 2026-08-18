# Prime QA — QA Test Automation

Central test scripting, orchestration, execution and reporting repository for Prime QA TCMS.

## Responsibility

This repository owns business-facing automated scenarios. It composes two independent engines:

- `primeqa-qa-ui-engine` for browser/UI execution
- `primeqa-qa-api-engine` for API execution

It is the only QA automation repository that should understand TCMS business workflows such as projects, test cases, users, configuration, execution and results.

## Cross-layer testing

A scenario may deliberately move between layers:

- create through UI → verify through API
- create through API → verify through UI
- change permissions through API → verify UI behaviour
- complete a UI workflow → verify resulting API state

Shared scenario context carries identifiers and test data between the engines.

## Dependency direction

```text
primeqa-qa-test-automation
          |
     +----+----+
     |         |
     v         v
 UI Engine   API Engine
     |         |
     v         v
 Browser    TCMS APIs
```

The two engines must remain independent of each other.

## Suggested test classification

- `@smoke`
- `@regression`
- `@ui`
- `@api`
- `@cross-layer`

## Environment

Expected variables:

- `UI_BASE_URL`
- `API_BASE_URL`

Credentials/tokens must be supplied securely by the execution environment and never committed.
