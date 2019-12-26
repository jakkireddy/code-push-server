# docker deploy code-push-server

This document is used to describe the docker deployment code-push-server, the example contains three parts

-code-push-server section
  -The update package uses `local` storage by default (that is, it is stored on the local machine). With the docker volume storage method, container destruction will not cause data loss unless the volume is manually deleted.
  -Internally use pm2 cluster mode to manage processes. The default number of open processes is cpu. You can set the deploy parameter in the docker-compose.yml file according to your machine configuration.
  -docker-compose.yml only provides a part of the parameter settings of the application. If you need to set other configurations, you can modify the file config.js.
-mysql part
  -The data is stored in a docker volume. Container destruction will not cause data loss unless the volume is manually deleted.
  -Do not use the root user for the application. For security, you can create relatively small permissions for code-push-server. You only need to give `select, update, insert` permission. Initializing the database requires root or a user with table creation permissions
-redis part
  -`tryLoginTimes` Limit on the number of login errors
  -`updateCheckCache` improves application performance
  -`rolloutClientUniqueIdCache` grayscale release

## install docker

Refer to the official docker installation tutorial

-[>> mac click here] (https://docs.docker.com/docker-for-mac/install/)
-[>> windowsclick here] (https://docs.docker.com/docker-for-windows/install/)
-[>> linux click here] (https://docs.docker.com/install/linux/docker-ce/ubuntu/)


`$ docker info` can successfully output related information, then the installation is successful, you can continue the following steps

## start swarm

`` `shell
$ sudo docker swarm init
`` `


## Get code

`` `shell
$ git clone https://github.com/lisong/code-push-server.git
$ cd code-push-server / docker
`` `

## Modify configuration file

`` `shell
$ vim docker-compose.yml
`` `

* Replace `YOU_MACHINE_IP` in` DOWNLOAD_URL` with external IP or domain name *

* Replace `YOU_MACHINE_IP` in` MYSQL_HOST` with internal IP *

* Replace `YOU_MACHINE_IP` in` REDIS_HOST` with internal IP address *

## jwt.tokenSecret modification

> code-push-server validates the json web token encryption method used for login authentication. The symmetric encryption algorithm is public, so it is important to modify the tokenSecret value in config.js.

*Very important! Very important! Very important! *

> You can open the connection https://www.grc.com/passwords.htm to get 63 randomly generated alpha-numeric characters as a key

## Deployment

`` `shell
$ sudo docker stack deploy -c docker-compose.yml code-push-server
`` `

> If the internet speed is not good, you need to wait long and patiently. . . Go chat with my sister ^ _ ^


## View progress

`` `shell
$ sudo docker service ls
$ sudo docker service ps code-push-server_db
$ sudo docker service ps code-push-server_redis
$ sudo docker service ps code-push-server_server
`` `

> Confirm that `CURRENT STATE` is` Running about ... `, it has been deployed

## Simple authentication of access interface

`$ curl -I http: // YOUR_CODE_PUSH_SERVER_IP: 3000 /`

Returns `200 OK`

`` `http
HTTP / 1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age = 15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode = block
Content-Type: text / html; charset = utf-8
Content-Length: 592
ETag: W / "250-IiCMcM1ZUFSswSYCU0KeFYFEMO8"
Date: Sat, 25 Aug 2018 15:45:46 GMT
Connection: keep-alive
`` `

## Browser Login

> Default username: admin Password: 123456 Remember to change the default password
> If you enter wrong password continuously for more than a certain number of times, you will not be able to log in again. You need to clear the redis cache

`` `shell
$ redis-cli -p6388 # Enter redis
flushall
> quit
`` `


## View service log

`` `shell
$ sudo docker service logs code-push-server_server
$ sudo docker service logs code-push-server_db
$ sudo docker service logs code-push-server_redis
`` `

## View storage `docker volume ls`

DRIVER | VOLUME NAME | Description
------ | ----- | -------
local | code-push-server_data-mysql | Database Storage Data Directory
local | code-push-server_data-storage | Storage package file directory
local | code-push-server_data-tmp | Temporary directory for calculating update package difference files
local | code-push-server_data-redis | redis landing data

## Destroy Exit Application

`` `bash
$ sudo docker stack rm code-push-server
$ sudo docker swarm leave --force
`` `