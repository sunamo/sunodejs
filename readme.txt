potřebuji samostatný projekt který mi dovolí používat node moduly:
Node core moduly ve webovém bundlu jsdom i http-proxy-agent používají moduly jako net, tls, child_process, které neexistují ve webovém prostředí. Pokud buildíš pro prohlížeč (např. electron-renderer nebo čistý web), tyto moduly není možné bundlovat.

https://copilot.microsoft.com/shares/ERtZcJDHywUVJwKcR6BwL

je to kvůli apps jako electron které přísně dělí na node a web část