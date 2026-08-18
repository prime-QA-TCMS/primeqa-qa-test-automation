import { test as base, expect } from '@playwright/test';
import { UiEngine } from '@primeqa/qa-ui-engine';
import { ApiEngine } from '@primeqa/qa-api-engine';

export interface SharedScenarioState {
  values: Map<string, unknown>;
  set<T>(key: string, value: T): void;
  get<T>(key: string): T | undefined;
}

interface QaFixtures {
  ui: UiEngine;
  api: ApiEngine;
  state: SharedScenarioState;
}

export const test = base.extend<QaFixtures>({
  ui: async ({ page }, use) => {
    const baseUrl = process.env.UI_BASE_URL;
    if (!baseUrl) throw new Error('UI_BASE_URL is required');
    await use(new UiEngine(page, { baseUrl }));
  },

  api: async ({ request }, use) => {
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl) throw new Error('API_BASE_URL is required');
    await use(new ApiEngine(request, { baseUrl }));
  },

  state: async ({}, use) => {
    const values = new Map<string, unknown>();
    await use({
      values,
      set<T>(key: string, value: T) {
        values.set(key, value);
      },
      get<T>(key: string) {
        return values.get(key) as T | undefined;
      },
    });
  },
});

export { expect };
