import * as utils from '../src/utils';

describe('utils', () => {
  describe('#deepExtend', () => {
    it('it should overwrite if flag set', () => {
      const res = utils.deepExtend(
        {
          some: 'thing',
        },
        {
          some: 'else',
        },
        true,
      );

      expect(res).to.eql({
        some: 'else',
      });
    });

    it('it should not overwrite', () => {
      const res = utils.deepExtend(
        {
          some: 'thing',
        },
        {
          some: 'else',
        },
        false,
      );

      expect(res).to.eql({
        some: 'thing',
      });
    });
  });

  describe('getPath', () => {
    it('should allow class getters I-1585', () => {
      class Child {
        get value() {
          return 'child getter';
        }
      }

      const child = new Child();

      class Parent {
        get child() {
          return child;
        }
      }

      const instance = new Parent();

      utils.getPath(instance, 'child.value');

      expect(utils.getPath(instance, 'child.value')).to.eql('child getter');
    });
  });

  describe('setPath', () => {
    it('should not pollute prototypes', () => {
      // https://snyk.io/vuln/SNYK-JS-I18NEXT-1065979

      const a = {};
      expect('malicious' in a.__proto__).to.eql(false);

      utils.setPath({}, '__proto__.malicious.code', function() {
        return { pollution: 'boom' };
      });

      expect('malicious' in a.__proto__).to.eql(false);
    });
  });

  describe('pushPath', () => {
    it('should not pollute prototypes', () => {
      // https://snyk.io/vuln/SNYK-JS-I18NEXT-1065979

      const a = {};
      expect('malicious' in a.__proto__).to.eql(false);

      utils.pushPath({}, '__proto__.malicious.code', 'value');

      expect('malicious' in a.__proto__).to.eql(false);
    });
  });
});
