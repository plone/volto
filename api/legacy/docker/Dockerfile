# FROM ericof/plone:5.1.0
FROM python:2.7-slim
MAINTAINER Asko Soukka <asko.soukka@iki.fi>

RUN mkdir -p /plone/src /plone/.cache
ENV PWD=/plone
ENV XDG_CACHE_HOME=/plone/.cache

WORKDIR /plone

RUN pip install -U setuptools pip virtualenv && virtualenv .

COPY requirements.txt /plone/requirements.txt

ENV buildDeps="python-dev build-essential libssl-dev libbz2-dev"
ENV runDeps="libmagic-dev"
RUN  apt-get update && apt-get install -y --no-install-recommends $buildDeps && \
     apt-get install -y --no-install-recommends $runDeps && \
     ./bin/pip install -r /plone/requirements.txt --no-cache-dir && \
     ./bin/pip install -U https://github.com/zopefoundation/z3c.autoinclude/archive/pip.tar.gz#egg=z3c.autoinclude && \
     SUDO_FORCE_REMOVE=yes apt-get purge -y --auto-remove $buildDeps  && \
     rm -rf /var/lib/apt/lists/*

COPY config_module /plone/src/config_module

RUN useradd --system -U -u 500 plone && \
    chown -R plone:plone /plone/* /plone/.cache

USER plone

EXPOSE 55001

ENV PYTHONPATH=/plone/src
ENV Z3C_AUTOINCLUDE_DEPENDENCIES_DISABLED=1
ENV ZSERVER_HOST=0.0.0.0
ENV CONFIGURE_PACKAGES=plone.app.versioningbehavior,plone.app.contenttypes,plone.restapi,config_module
ENV APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:tiles

ENTRYPOINT ["/plone/bin/robot-server", "plone.app.robotframework.testing.PLONE_ROBOT_TESTING"]
