// core/logger/logger.js
// Logger centralizado (com nÃ­veis) â€” pronto para integrar com UI/LogAplicacoes
const levelOrder = { debug: 10, info: 20, warn: 30, error: 40 };
let currentLevel = 'info';

export function setLevel(level) {
  if (level in levelOrder) {
    currentLevel = level;
  }
}
export function getLevel() {
  return currentLevel;
}

function shouldLog(level) {
  return levelOrder[level] >= levelOrder[currentLevel];
}

function fmt(level, msg, args) {
  const time = new Date().toISOString();
  return [`[${time}] [${level.toUpperCase()}]`, msg, ...args];
}

const logger = {
  debug(msg, ...args) {
    if (shouldLog('debug')) {
      console.debug(...fmt('debug', msg, args));
    }
  },
  info(msg, ...args) {
    if (shouldLog('info')) {
      console.info(...fmt('info', msg, args));
    }
  },
  warn(msg, ...args) {
    if (shouldLog('warn')) {
      console.warn(...fmt('warn', msg, args));
    }
  },
  error(msg, ...args) {
    if (shouldLog('error')) {
      console.error(...fmt('error', msg, args));
    }
  },
};

export { logger };
export default logger;
