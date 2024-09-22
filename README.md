<h1 align="center">rpi-cli</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rpi-cli" target="_blank">
    <img src="https://badgen.net/npm/v/rpi-cli" alt="NPM version">
  </a>
</p>

<p align="center">
  Cli utility for interacting with a server instance
</p>

## Installation

```sh
npm install rpi-cli -g
```
or
```sh
yarn global add rpi-cli
```

## Getting started

>  The target server-instance needs to have ssh configured.


The first step is to setup the desired server-instance:

```sh
rpi init
```



You will be prompted for some required configuration and preferences:
- **Server IP**: ip of the target server.
- **Server user**: user to be used when connecting through ssh.
- **Configure nginx**: whether to setup nginx.

> Server Ip and user will be stored in a configuration file `.rpirc`, which will be read on consecutive executions.

The process will:
- Install `vsftdp`, required for deploying.
- Install `docker`.
- Configure `nginx`, if requested.


## Available commands

- [**init**](/docs/commands.md#init): described above, to initially configure a server.
- [**deploy**](/docs/commands.md#deploy): deploy a docker/web application from a folder.
- [**config**](/docs/commands.md#deploy): read and update configuration values.


## Development

```sh
# install dependencies
npm i
# build cli
npm run build-local
# link the package globally
npm link
# test cli
rpi -h
```
