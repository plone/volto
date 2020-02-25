# Apache

Apache configuration for a Plone backend deployed under /api and a Volto frontend deployed under the root "/". This configuration also redirects http -> https:

```apache
<Proxy balancer://plonebackend>

  ProxySet lbmethod=bybusyness
  BalancerMember http://127.0.0.1:8001

</Proxy>

<Proxy balancer://voltofrontend>
  # Use Pending Request Counting Algorithm (s. http://httpd.apache.org/docs/current/mod/mod_lbmethod_bybusyness.html).
  # This will reduce latencies that occur as a result of long running requests temporarily blocking a ZEO client.
  # You will need to install the separate mod_lbmethod_bybusyness module in Apache 2.4.
  ProxySet lbmethod=bybusyness
  BalancerMember http://127.0.0.1:8010

</Proxy>

RewriteEngine On
ProxyPreserveHost On

RewriteCond     %{ENV:HTTP_VHOST}       ^example\.com$  [NC]
RewriteRule     (.*)                    https://www.example.com$1  [R,L]

RewriteCond     %{ENV:HTTP_VHOST}       ^www\.example\.com$  [NC]
RewriteRule     ^/api($|/.*)            balancer://plonebackend/VirtualHostBase/https/www.example.com:443/Plone/VirtualHostRoot/_vh_api$1  [P,L]

RewriteCond     %{ENV:HTTP_VHOST}       ^www\.example\.com$  [NC]
RewriteRule     ^(.*)                   balancer://voltofrontend$1        [P,L]

ProxyPassReverse        /               balancer://voltofrontend/
```
