export default [
  {
    // Use flat config ignores instead of .eslintignore
    ignores: ['dist/**', 'src/features/dashboard/DashboardPage.js']
  },
  {
    files: ['src/js/app.js'],
    rules: {
      // Legacy monolith relies on window-scoped functions; downgrade to warn
      'no-undef': 'warn',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['src/features/backup/BackupService.js'],
    rules: {
      // Reduce noise from deep template indentation in readme export section
      'indent': ['warn', 2, { ignoredNodes: ['CallExpression[callee.name="addText"] *'] }]
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
  process: 'readonly',
  requestAnimationFrame: 'readonly',
  HTMLElement: 'readonly',
  Event: 'readonly',
  FormData: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
  prompt: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
  URLSearchParams: 'readonly',
        XLSX: 'readonly',
        jsPDF: 'readonly',
  FileReader: 'readonly',
        __dirname: 'readonly',
        fetch: 'readonly',
        MutationObserver: 'readonly',
        getComputedStyle: 'readonly',
        Notification: 'readonly',
        CustomEvent: 'readonly',
        btoa: 'readonly',
        atob: 'readonly',
        self: 'readonly',
        global: 'readonly',
        performance: 'readonly',
        history: 'readonly',
        queueMicrotask: 'readonly',
        Option: 'readonly',
        IDBDatabase: 'readonly',
        IDBObjectStore: 'readonly',
        IDBIndex: 'readonly',
        IDBCursor: 'readonly',
        IDBTransaction: 'readonly',
        indexedDB: 'readonly',
        DOMException: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        TextDecoder: 'readonly',
        TextEncoder: 'readonly',
        Image: 'readonly',
        AbortController: 'readonly',
        clients: 'readonly',
        location: 'readonly',
        chrome: 'readonly',
        browser: 'readonly',
        gapi: 'readonly',
        MessageChannel: 'readonly',
        Buffer: 'readonly',
        router: 'readonly',
        modal: 'readonly',
        caches: 'readonly',
      }
    },
    rules: {
  // Em base de código legado com uso de window.*, reduzir bloqueio
      'no-undef': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'semi': ['warn', 'always'],
      'quotes': ['error', 'single'],
      // Estilo legado como aviso para correção gradual
      'indent': ['warn', 2],
      'no-trailing-spaces': 'warn',
      'eol-last': 'warn',
      // Allow single-line no-brace; avisar para multi-line
      'curly': ['warn', 'multi-line'],
      'eqeqeq': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error'
    }
  }
]; 