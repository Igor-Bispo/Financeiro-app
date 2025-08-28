// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';

// Mock the legacy AnalyticsPage module that the shim imports
vi.mock('../src/js/ui/AnalyticsPage.js', () => {
  return {
    AnalyticsPage: {
      render: vi.fn(async (budgetId) => {
        const el = document.createElement('div');
        el.setAttribute('data-budget', budgetId || 'none');
        el.textContent = 'Analytics OK';
        return el;
      }),
    },
  };
});

// Import the shim after mocks are set up
import { render as renderAnalyticsShim } from '../src/features/analytics/AnalyticsPage.js';

describe('features/analytics/AnalyticsPage shim', () => {
  it('renders legacy AnalyticsPage into the provided container', async () => {
    // Arrange
    const container = document.createElement('div');
    document.body.appendChild(container);
    // Provide a budget id as the shim reads it from window.appState
    window.appState = { currentBudget: { id: 'budget-123' } };

    // Act
    await renderAnalyticsShim(container);

    // Assert
    expect(container.children.length).toBe(1);
    const child = container.children[0];
    expect(child.textContent).toBe('Analytics OK');
    expect(child.getAttribute('data-budget')).toBe('budget-123');
  });
});
