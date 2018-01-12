export default class Api {
  static getData() {
    return import('../../server/test.json');
  }
}
