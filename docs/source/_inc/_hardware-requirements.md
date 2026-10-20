The hardware requirements below give a rough estimate of the minimum hardware setup needed for a Plone server.

A single Plone installation is able to run many Plone sites.

-   Installation of the Plone backend and Classic UI frontend requires a minimum of 256 MB of RAM and 2GB of disk swap space.
-   Installation of the Volto frontend requires a minimum of 2GB of RAM.
-   After installation, running Plone requires a minimum of 256 MB RAM and 512 MB of disk swap space per Plone site.
    2 GB or more RAM per Plone site is recommended.
-   Minimum 512 MB hard disk space is required.
    40 GB or more hard disk space is recommended.


````{warning}
{term}`Add-on` products and caching solutions may also increase RAM and disk swap space requirements.
To avoid RAM and disk swap limitations, we recommend either temporarily resizing your remote machine to accommodate the build, or build your images locally and upload them to an image store, such as [Docker Hub](https://hub.docker.com/) or [GitHub Actions](https://github.com/features/actions).
```{seealso}
[How much RAM is required to build a Volto front end?](https://community.plone.org/t/how-much-ram-is-required-to-build-a-volto-front-end/17949) and [Dealing with heap exhaustion while building Volto 17 on limited-RAM host](https://community.plone.org/t/dealing-with-heap-exhaustion-while-building-volto-17-on-limited-ram-host/18078).
```
````
