export default class Helpers {
    static findByTextWithXPath(string) {
        return `//*[contains(text(), "${string}")]`;
    }
    static getObjByDataValue(dataValueStr) {
        return `//*[@data-value="${dataValueStr}"]`;
    }
}
