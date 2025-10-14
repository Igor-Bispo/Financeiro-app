// tests/features/eventBus.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { eventBus, on, off, emit } from '../../src/core/events/eventBus.js';

describe('EventBus System', () => {
  beforeEach(() => {
    eventBus.clear();
  });

  it('should register and emit events', () => {
    let receivedData = null;

    on('test:event', (data) => {
      receivedData = data;
    });

    emit('test:event', { message: 'Hello World' });

    expect(receivedData).toEqual({ message: 'Hello World' });
  });

  it('should handle multiple listeners for same event', () => {
    const results = [];

    on('test:event', (data) => results.push(`listener1: ${data}`));
    on('test:event', (data) => results.push(`listener2: ${data}`));

    emit('test:event', 'test data');

    expect(results).toHaveLength(2);
    expect(results[0]).toBe('listener1: test data');
    expect(results[1]).toBe('listener2: test data');
  });

  it('should remove specific listeners', () => {
    let receivedData = null;

    const listener = (data) => { receivedData = data; };
    on('test:event', listener);

    off('test:event', listener);
    emit('test:event', 'should not receive');

    expect(receivedData).toBeNull();
  });

  it('should handle non-existent events gracefully', () => {
    expect(() => {
      emit('non:existent', 'data');
    }).not.toThrow();
  });
});
