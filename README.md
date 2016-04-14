# Typings for Visual Studio Team Services [![Build Status](https://travis-ci.org/touchifyapp/vsts-typings.svg)](https://travis-ci.org/touchifyapp/vsts-typings)

[Typings](https://github.com/typings/typings) build task for [Visual Studio Team Services](https://www.visualstudio.com/fr-fr/products/visual-studio-team-services-vs.aspx).

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=touchify.vsts-typings).

## Usage

Add the task to your build configuration:

![Add typings Task](https://raw.githubusercontent.com/touchifyapp/vsts-typings/master/screenshots/screen-add.png)

_(Optional)_. Select `command` to execute in Typings. (Defaults to `install`).

![Set command](https://raw.githubusercontent.com/touchifyapp/vsts-typings/master/screenshots/screen-simple.png)

_(Optional)_. Set advanced settings.

![Set advanced](https://raw.githubusercontent.com/touchifyapp/vsts-typings/master/screenshots/screen-advanced.png)

## Options

* __Command__: Command to execute.  _Default:_ `install`.
* __Arguments__: Additional arguments passed to Typings.
* __Typings JSON Path__: Relative path to `typings.json` file.  _Default:_ `typings.json`.
* __Typings CLI__: _Optional._  Typings runtime to run.  When agent can't find this Typings runtime nor global installed one, it will install Typings globally before run (slower).  _Default:_ `node_modules/typings/bin/typings.js`.

## License

[MIT](https://raw.githubusercontent.com/touchifyapp/vsts-typings/master/LICENSE)