define(["components/inbox/module"],function(a){"use strict";return a.registerFactory("InboxConfig",["$http",function(a){return a.get("api/inbox.json")}])});