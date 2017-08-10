import 'isomorphic-fetch';
import nock from 'nock';
import UserService from '../User';
import noteFoundBody from '../__mocks__/json/userNotFound';
import openProfile from '../__mocks__/json/openProfile';

const serviceUrl = '//api.templatemonster.com/users/v1/';

describe('Initialization', () => {
  it('It should throw exception if you create new instance without url', () => {
    expect(() => {
      const userService = new UserService();
    }).toThrow();
  });

  it('It should throw exception if URL is invalid', () => {
    expect(() => {
      const userService = new UserService('fooURL');
    }).toThrow();
  });

  it('It should not throw exception if URL is valid', () => {
    expect(() => {
      const userService = new UserService(serviceUrl);
    }).not.toThrow();
  });

  it('Token should be null, if not provided', () => {
    const userService = new UserService(serviceUrl);
    expect(userService.token).toBe(null);
  });

  it('Token should be stored, if provided', () => {
    const token = 'token';
    const userService = new UserService(serviceUrl, token);
    expect(userService.token).toBe(token);
  });

  it('Token should change if you setup it with method', () => {
    const token = 'token';
    const userService = new UserService(serviceUrl);
    userService.setToken(token);
    expect(userService.token).toBe(token);
  });

  it('If you will provide something but URL to checkUrl error mast be thrown', () => {
    expect(() => {
      UserService.checkUrl('fooURL');
    }).toThrow();
  });

  it('If you will provide URL to checkUrl error mast not be thrown and url should be returned without changes', () => {
    expect(() => {
      UserService.checkUrl('fooURL');
    }).toThrow();
    const url = UserService.checkUrl(serviceUrl);
    expect(url).toBe(serviceUrl);
  });
});

describe('Get user Profile', () => {
  it('If we request user profile without ID error mast be thrown', async () => {
    const userService = new UserService(serviceUrl);
    try {
      await userService.getOpenProfile();
    } catch (object) {
      expect(object.message).toEqual(UserService.messages.idMissing);
    }
  });

  it('If there are no user with such Id', async () => {
    const userService = new UserService(serviceUrl);
    const id = 1;
    nock(/[.]+/)
      .get(`/users/v1/users/${id}/profile`)
      .reply(404);

    try {
      await userService.getOpenProfile(id);
    } catch (error) {
      expect(error.statusCode).toEqual(404);
    }
  });

  it('If server fail', async () => {
    const userService = new UserService(serviceUrl);
    const id = 1;
    nock(/[.]+/)
      .get(`/users/v1/users/${id}/profile`)
      .reply(500);

    try {
      await userService.getOpenProfile(id);
    } catch (error) {
      expect(error.statusCode).toEqual(500);
    }
  });

  it('If response body is empty', async () => {
    const userService = new UserService(serviceUrl);
    const id = 1;
    nock(/[.]+/)
      .get(`/users/v1/users/${id}/profile`)
      .reply(200);

    try {
      await userService.getOpenProfile(id);
    } catch (error) {
      expect(error.type).toEqual('invalid-json');
    }
  });

  it('If everything OK', async () => {
    const userService = new UserService(serviceUrl);
    const id = 1;
    nock(/[.]+/)
      .get(`/users/v1/users/${id}/profile`)
      .reply(200, openProfile);

    const profile = await userService.getOpenProfile(id);
    expect(profile).toEqual(openProfile);
  });
});

describe('Get my profile', () => {
  it('If access tocken is not set you should ', async () => {
    const userService = new UserService(serviceUrl);
    try {
      await userService.getMyProfile();
    } catch (error) {
      console.log('error: ', error);
      expect(1).toEqual(1);
    }
  });
});
