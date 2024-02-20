Install [Docker Desktop](https://docs.docker.com/get-docker/) for your operating system.
Docker Desktop includes all Docker tools.

It's required that the user you will run install script with be in the docker group.
You can add the user to the group by running (from the user shell) :
```
usermod -a -G docker $USER && newgrp docker
```
