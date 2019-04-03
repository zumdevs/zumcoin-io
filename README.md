[![Build Status](https://travis-ci.org/zumcoin/zumcoin.org.svg?branch=master)](https://travis-ci.org/zumcoin/zumcoin.org)

# zumcoin.org

To submit or propose changes to [zumcoin.org](https://zumcoin.org), submit a pull request to this repository.


## Developing

### About

This project uses [Jekyll](https://jekyllrb.com) to generate a static website.

### Setup

1. Make sure you have [Ruby](https://www.ruby-lang.org/en) 2.3 or newer installed.
2. Run `gem install bundler` to install [bundler](http://bundler.io).
3. Run `bundle install` to install the dependencies of this project.
4. Run `bundle exec jekyll serve` to start the development server at `http://localhost:4000`. See [Jekyll documentation](https://jekyllrb.com/docs/home/) for more information.


## Deployment

Commits to `master` auto deploy via Travis CI to GitHub pages.

### Deploying manually

* `./scripts/build.sh`
* `./scripts/deploy.sh` 


## Localization

All translations live in the `_i18n` folder.

### Adding a new language

* Create a fork of this repository.
* Create a copy of `_i18n/en.yml` and name the file after the locale.
* Replace the English text with the translated version.
* Add the language details to the _Localization config_ in `_config.yml`.
* Submit a pull request. Find someone in the community familiar with that language to review it.

### Suggesting changes

* Create a fork of this repository.
* Find the right language in `_i18n`.
* Make your change. Submit a pull request.
* Ping the contributors of your language from below for a review.

### Contributors

* Afrikaans: [@jacojvv](https://github.com/jacojvv), [@Reinsie44](https://github.com/Reinsie44)
* Chinese: [@sbc-zum](https://github.com/sbc-zum), `@sdyu ges`
* Deutsch: [@encryptedunicorn](https://github.com/encryptedunicorn), [@hurrdurrnein](https://github.com/hurrdurrnein), [@armitage0](https://github.com/armitage0)
* Español: [@euricanti](https://github.com/euricanti), [@mrrovot](https://github.com/mrrovot), [@adj-gh](https://github.com/adj-gh), [@SrWhiteRD](https://github.com/SrWhiteRD).
* Français: [@DaliaAsTrue](https://github.com/DaliaAsTrue), [@romromna](https://github.com/romromna), [@SaintePelle](https://github.com/SaintePelle), [@andrelegault](https://github.com/andrelegault)
* Turkish: [@Mersaultkn](https://github.com/Mersaultkn), [@alicans](https://github.com/alicans)
* Italiano: [@andreafno](https://github.com/andreafno), [@4k4](https://github.com/4k4)
* Portuguese: [@D4rkGh05t](https://github.com/D4rkGh05t), [@Mineirofox](https://github.com/Mineirofox)
* Russian: [@Jihadist](https://github.com/Jihadist), [@CaptainMeatloaf](https://github.com/CaptainMeatloaf)
* Korean: [@seocal](https://github.com/seocal)
