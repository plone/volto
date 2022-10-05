export function getBackendBaseURL() {
  return Cypress.config().apiBaseURL || Cypress.config().baseUrl;
}
