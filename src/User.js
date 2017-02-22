import fetch from 'isomorphic-fetch';

/**
 * User API JS client
 *
 * @param url Root path of the service, i.e. http://service-users.sol.dev/api/v1
 * @constructor Users
 */
export default class User {
	constructor(url) {
		this._url = url;
	}


	/**
	 * Returns user's publicly available theme (name, avatar, colors).
	 *
	 * You will get an object {"userName":"...string","avatar":"...string","background":"#42a5f5"}
	 *
	 * @param user_id User id
	 * @method Users#theme
	 */
	async theme(user_id) {
		const url = this._url + "/users/" + user_id + "/profile";

		const response = await fetch(url);

		if (response.status >= 400) {
			throw new Error("Bad server response");
		}

		return await response.json();
	}
}
