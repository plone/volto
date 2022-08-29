export class MIMETypeName {
  constructor(name) {
    if (name.includes('/')) {
      this.name = name;
      this.firstName = name.split('/')[0];
      this.secondName = name.split('/')[1];
    } else {
      this.firstName = name;
      this.secondName = null;
    }
  }

  /**
   * @param {MIMETypeName} mt
   */
  matches(mt) {
    return (
      this.firstName === mt.firstName &&
      (this.secondName && mt.secondName
        ? this.secondName === mt.secondName
        : true)
    );
  }
}
