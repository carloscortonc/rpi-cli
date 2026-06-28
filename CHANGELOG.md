# [2.1.0](https://github.com/carloscortonc/rpi-cli/compare/v2.0.0...v2.1.0) (2026-06-28)


### Bug Fixes

* update check-server ([#28](https://github.com/carloscortonc/rpi-cli/issues/28)) ([145cf30](https://github.com/carloscortonc/rpi-cli/commit/145cf30e11b6bd6c31985fcf5d97c461e5c48aab))


### Features

* `exec` command ([#21](https://github.com/carloscortonc/rpi-cli/issues/21)) ([26dd199](https://github.com/carloscortonc/rpi-cli/commit/26dd199906b9fa27c3c9b7e4ee44b99d7e8cc036))
* allow stdin on exec command ([#25](https://github.com/carloscortonc/rpi-cli/issues/25)) ([e7abe55](https://github.com/carloscortonc/rpi-cli/commit/e7abe55829a336902f63a06cd86d2d63305e0f51))
* deploy - check first if server is reachable ([#26](https://github.com/carloscortonc/rpi-cli/issues/26)) ([b54f954](https://github.com/carloscortonc/rpi-cli/commit/b54f95482687ce16185230766912e43edef05fe3))
* update default config location ([#24](https://github.com/carloscortonc/rpi-cli/issues/24)) ([f573183](https://github.com/carloscortonc/rpi-cli/commit/f573183cf2746757906838f7a57616d47eea576a))

# [2.0.0](https://github.com/carloscortonc/rpi-cli/compare/v1.0.0...v2.0.0) (2025-10-05)


### Features

* create release-preview wf ([#3](https://github.com/carloscortonc/rpi-cli/issues/3)) ([337110a](https://github.com/carloscortonc/rpi-cli/commit/337110aeed4b9a4f531a61483f1192b0045af690))
* print logs after deploying ([bfd014e](https://github.com/carloscortonc/rpi-cli/commit/bfd014e6aeece47fdb729725fe6908bebecb2b20))
* simplify `deploy docker` definition ([#14](https://github.com/carloscortonc/rpi-cli/issues/14)) ([de46b28](https://github.com/carloscortonc/rpi-cli/commit/de46b280279793f64f1aa5bb7869faf5ed6356ad))
* simplify `init` script as vsftpd is no longer required ([03da97a](https://github.com/carloscortonc/rpi-cli/commit/03da97a1961501bcd74b8772d4391c4350643103))
* support docker compose ([#8](https://github.com/carloscortonc/rpi-cli/issues/8)) ([399693d](https://github.com/carloscortonc/rpi-cli/commit/399693d8744ea29f4d9f485ea7690cd9adea4260))
* support for envfile as secrets ([fb4d1f1](https://github.com/carloscortonc/rpi-cli/commit/fb4d1f1c60a6a1ec50e90c88a193a75975b3769c))
* switch to namespaces for config & deploy ([#6](https://github.com/carloscortonc/rpi-cli/issues/6)) ([1b70683](https://github.com/carloscortonc/rpi-cli/commit/1b70683acfd59ae8143c734657061b2b655f07d3))
* upload command ([#12](https://github.com/carloscortonc/rpi-cli/issues/12)) ([9f7e4a2](https://github.com/carloscortonc/rpi-cli/commit/9f7e4a293f737c0a2f224c8acfc8369ff6e8e897))


### BREAKING CHANGES

* `deploy` command changes how the type is specified (`rpi docker deploy --type=web` => `rpi docker deploy web`)

# 1.0.0 (2024-09-22)


### Features

* `init` command ([e806985](https://github.com/carloscortonc/rpi-cli/commit/e806985de1bd9e328605a54c0405524ebe2bc7b4))
* deploy from folder, default to local-build ([f1d110e](https://github.com/carloscortonc/rpi-cli/commit/f1d110e68767a4e3b559c1d32e878ae4fe0ecc22))
* initial structure ([d40b166](https://github.com/carloscortonc/rpi-cli/commit/d40b1665c14d764be2c20e77f87a983b087bd406))
* support multiple docker --build-arg ([f95e31f](https://github.com/carloscortonc/rpi-cli/commit/f95e31f3327ddcb9a8e6eee889e729fdf3f3d21d))
* switch config strategy to use `INI` format ([15bd7fd](https://github.com/carloscortonc/rpi-cli/commit/15bd7fdf49c4ef1cb960fc56d5a5fc4d046389c8))
* validate required configuration ([b3a6483](https://github.com/carloscortonc/rpi-cli/commit/b3a6483f4d8ecde6a4922cea8d303ba975df7161))
