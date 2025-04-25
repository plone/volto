export function getIfExists(
  selector,
  successAction = () => {},
  failAction = () => {},
) {
  cy.get('body').then((body) => {
    if (body.find(selector).length > 0 && successAction) {
      successAction();
    } else if (failAction) {
      failAction();
    }
  });
}
