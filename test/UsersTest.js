import { assert } from 'chai';
import nock from 'nock';
import User from '../src';

const serviceUrl = 'http://service-users.sol.dev/api/v1';
const userTheme = { userName: 'Русский Tüfekci 野村', avatar: '', background: '#42a5f5' };

describe('Users API', () => {
  beforeEach(function () {
    this.api = new User(serviceUrl);

    this.willReturnResponse = function (url, data) {
      nock(serviceUrl)
				.get(url)
				.reply(200, data);
    };

    this.willReturn404 = function (url) {
      nock(serviceUrl)
				.get(url)
				.reply(404);
    };
  });

  describe('users prfile', () => {
    it('works out successful scenario', function (done) {
      this.willReturnResponse('/users/21429011/profile', userTheme);

      this.api.getOpenProfile(21429011).then((theme) => {
        assert.deepEqual(theme, userTheme);
        done();
      });
    });

    it('behaves ok when an error occurs', function (done) {
      this.willReturn404('/users/21429011/profile');
      this.api.theme(21429011).catch((e) => {
        done();
      });
    });
  });

  describe('users theme', () => {
    it('works out successful scenario', function (done) {
      this.willReturnResponse('/users/21429011/profile', userTheme);

      this.api.theme(21429011).then((theme) => {
        assert.deepEqual(theme, userTheme);
        done();
      });
    });

    it('behaves ok when an error occurs', function (done) {
      this.willReturn404('/users/21429011/profile');
      this.api.theme(21429011).catch((e) => {
        done();
      });
    });
  });
});
