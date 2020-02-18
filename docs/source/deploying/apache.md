# Deploying Volto behind an Apache Webserver

Apache Configuration:

```
<Proxy balancer://backend>

  ProxySet lbmethod=bybusyness
  BalancerMember http://127.0.0.1:8001

</Proxy>

<Proxy balancer://frontend>

  ProxySet lbmethod=bybusyness
  BalancerMember http://127.0.0.1:8010

</Proxy>

RewriteEngine On
ProxyPreserveHost On

RewriteCond     %{ENV:HTTP_VHOST}       example\.com$  [NC,OR]
RewriteCond     %{ENV:HTTP_VHOST}       ^example\.com$  [NC]
RewriteRule     (.*)                    https://www.example.com$1  [R,L]

RewriteCond     %{ENV:HTTP_VHOST}       ^www\.example\.com$  [NC]
RewriteRule     ^/api($|/.*)            balancer://backend/VirtualHostBase/https/www.example.com:443/Plone/VirtualHostRoot/_vh_api$1  [P,L]

RewriteCond     %{ENV:HTTP_VHOST}       ^www\.example\.com$  [NC]
RewriteRule     ^(.*)                   balancer://frontend$1        [P,L]

ProxyPassReverse        /               balancer://frontend/
```