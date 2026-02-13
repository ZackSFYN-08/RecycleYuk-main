export function logInfo(scope, ...args) {
  // Lightweight wrapper around console.log for consistent tagging
  // Example scope: 'Payment', 'GrpcProxy', 'UserDashboard'
  // eslint-disable-next-line no-console
  console.log(`[${scope}]`, ...args);
}

export function logError(scope, error, ...args) {
  // eslint-disable-next-line no-console
  console.error(`[${scope}]`, error, ...args);
}

