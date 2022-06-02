# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0](https://github.com/compare/v0.0.4...v0.1.0) (2022-06-02)


### Bug Fixes

* **all:** make lerna commands play nice with yarn workspaces ([5717344](https://github.com/commit/57173443e138d89320e8316f93375ab139fb8d9c))
* change packages order when running build from root to avoid broken links among them ([09e5b32](https://github.com/commit/09e5b32ae619d21f08cb8ffe84c0a193dd1a1ebe))


### Features

* add command to authenticate via a wallet mnemonic phrase ([d15f1d2](https://github.com/commit/d15f1d2212845372e3c520bf539c5c7f3d0125c7))





## [0.0.4](https://github.com/compare/v0.0.3...v0.0.4) (2022-06-01)

**Note:** Version bump only for package @qfi/qfi





## [0.0.3](https://github.com/compare/v0.0.2...v0.0.3) (2022-06-01)


### Bug Fixes

* **all:** fix circular dependencies, changes to hoisting in monorepo, fix failing build ([1421c97](https://github.com/commit/1421c971a8dd5a85d96fbf67baf5a0dac6a7b062))
* **ci:** build failing ([e85b744](https://github.com/commit/e85b74426f45a3b75148e82cfaf85cee62da0701))





## 0.0.2 (2022-06-01)


### Bug Fixes

* add missing initialization to start indexing Grant Round templates ([ab1e435](https://github.com/commit/ab1e435ea8dadfe107038c7e547f51c8579a33c0))
* match eslint version of subgraph and cli packages to app to avoid build errors ([bbe6141](https://github.com/commit/bbe61411060b8143809f8e6a66e94aee0ad8f3fc))
* solve build errors ([f36722a](https://github.com/commit/f36722afeeadb2a7e5d560ae0db94a4ff2e60755))
* typo when retrieving an event param ([03f036a](https://github.com/commit/03f036ae3df56c3fbeff6b060ea23f4145d04970))
* update abi imports from build to typechain folder ([26917de](https://github.com/commit/26917de487116c38c66259304371ea242982e6a3))
* wrong workaround address ([8bddfb4](https://github.com/commit/8bddfb467a9c17cf457ac3f60f0cae0afe4b069f))


### Features

* add cli boilerplate ([55299af](https://github.com/commit/55299af20bf7c2bd12be7a55f31c520271be2ecd))
* add deploy MACI/QFI smart contracts command ([4af03d8](https://github.com/commit/4af03d8f8f69d3041ddc7ca6451955d42c38a560))
* add first complete draft of all necessary mappings ([ef93b3d](https://github.com/commit/ef93b3d7b6829bbeb712b84c0abae16e753bc781))
* add genkeys command ([d900757](https://github.com/commit/d9007573a51577df551240bdaf259f589b07a3e1))
* add QR code scan for Admin page ([d948b08](https://github.com/commit/d948b08001904412c11b02dba988fcf874bed2a1))
* add register recipients command ([3feff1d](https://github.com/commit/3feff1d82f11e7b63f51cba131743228d3aeb7f5))
* add relationship between Contributor and PublicKey entities ([6316bb3](https://github.com/commit/6316bb31bc64db24ada6c8699baf6c422eeccf2d))
* add sender and tx hash tracking for message entity ([54f627b](https://github.com/commit/54f627b30611d7f31abad12437398d68148b836a))
* add subgraph yaml; add empty mapping files for graph codegen ([03c2eaa](https://github.com/commit/03c2eaa435f8a3a8f4962ce2676aa0f40d136358))
* add tracking of contributions and lifetime amount for PublicKey ([55da83c](https://github.com/commit/55da83ccd61507ce589369feb2cd9bc43878a1f4))
* add unit test for QFI deploy and initialization ([4151380](https://github.com/commit/41513804565cf86485ca4890f748369c3e9d395d))
* store tx hash when creating a new Contributor ([ae8459e](https://github.com/commit/ae8459e08d0d156cf889e69168e7c12de2273e55))
