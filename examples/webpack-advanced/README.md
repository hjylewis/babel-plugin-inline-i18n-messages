1. `npm install`
1. `npm start`

Optimization so that you aren't rebuilding the entire application for each locale. Instead you insert [sentinels](https://en.wikipedia.org/wiki/Sentinel_value) and doing a simple find and replace for each locale.

Inspired by:

- https://codeascraft.com/2020/02/03/production-webpack-builds/
- https://youtu.be/nDAvXOePowM?t=1145
