module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        navigator: 'readonly',
        URL: 'readonly',
        Blob: 'readonly',
        
        // Firebase globals
        FirebaseApp: 'readonly',
        FirebaseAuth: 'readonly', 
        FirebaseDB: 'readonly',
        
        // App globals
        appState: 'readonly',
        
        // Google Analytics
        gtag: 'readonly',
        dataLayer: 'readonly',
        
        // External libraries
        XLSX: 'readonly',
        jsPDF: 'readonly'
      }
    },
    rules: {
      // Problemas críticos apenas
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      
      // Formatação básica
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      
      // Estrutura
      'curly': 'error',
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error'
    }
  }
]; 