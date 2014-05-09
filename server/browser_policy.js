BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowConnect();


var rootUrl = __meteor_runtime_config__.ROOT_URL;
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin("http://exmp-eat-46040.euw1.nitrousbox.com/");
BrowserPolicy.content.allowConnectOrigin("ws://exmp-eat-46040.euw1.nitrousbox.com/");
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

BrowserPolicy.content.allowConnectOrigin("https://*.meteor.com");
BrowserPolicy.content.allowConnectOrigin("wss://*.meteor.com");

BrowserPolicy.content.allowImageOrigin("*.employeescheme.co.uk");

BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
