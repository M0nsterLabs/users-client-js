<a name="Users"></a>

## Users
**Kind**: global class  

* [Users](#Users)
    * [new Users(url)](#new_Users_new)
    * [.theme(user_id)](#Users+theme)

<a name="new_Users_new"></a>

### new Users(url)
User API JS client


| Param | Description |
| --- | --- |
| url | Root path of the service, i.e. http://service-users.sol.dev/api/v1 |

<a name="Users+theme"></a>

### users.theme(user_id)
Returns user's publicly available theme (name, avatar, colors).

You will get an object {"userName":"...string","avatar":"...string","background":"#42a5f5"}

**Kind**: instance method of <code>[Users](#Users)</code>  

| Param | Description |
| --- | --- |
| user_id | User id |

