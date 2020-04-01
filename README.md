# node-scdl
An easy to use, minimal dependency Soundcloud song downloader.

## Installation
This module uses only one dependency: [Phin](https://www.npmjs.com/package/phin). This means that node-scdl is very lightweight.

To install:
```bash 
npm install node-scdl
```

## Usage
Simiply require the scdl package just like you would with any other module. Then create a new instance of the SoundCloudDownloader client using a client ID. You can find a client ID in the request headers of the Soundcloud website. Open the developer tools in your favorite browser, 
```js
const SCDL = require('node-scdl')

const SoundCloudDownloader = new SCDL('abcdefghijklmnopqrstuvwxyz123456') // This fake Client ID can be replaced with a valid one

console.log(SoundCloudDownloader.getInfo(SoundCloudDownloader.getID('https://soundcloud.com/tarroofficial/alone-ft-jutes-noey'))) // Should return a JSON response of Soundcloud Metadata (ie. {title: "alone ft. jutes x noey", artist: "tarro"})
```

### How to obtain a client ID
1. Open the Web Developer Tools in your favorite browser
2. Go to the network tab
3. Open up a tab with a SoundCloud song
4. Select a request/response that contains song data. It should contain about 3 JSON items, one of them being a client ID
5. Copy and paste that

## API
### SCDL
#### Constructor
*Creates a new instance of the Soundcloud Downloader*
__Params__
`clientID` (String) - A valid Soundcloud-API-V1 Client ID
__Usage__
```js
new SoundCloudDownloader = new SCDL(clientID)
```


#### Methods
##### SCDL#getInfo
*Gets all of the Soundcloud Metadata for the track*
__Params__
`id` (Number/String) - A valid Soundcloud Track ID
`callback` (Function) (Optional) - A callback function
__Returns__
`Promise<JSON>` - Soundcloud Track Metadata (otherwise returns `Promise<JSON>` to the callback if one is provided)
__Usage__
```js
SoundCloudDownloader.getInfo(12345789)
```

##### SCDL#getID
*Accepts the URL and resolves it to an ID that can be used with other SCDL functions*
__Params__
`url` (Number/String) - A valid Soundcloud Track URL
`cb` (Function) (Optional) - A callback function
__Returns__
`Promise<Number>` - Soundcloud Track ID (otherwise returns `Promise<Number>` to the callback if one is provided)
__Usage__
```js
SoundCloudDownloader.getID('https://soundcloud.com/tarroofficial/alone-ft-jutes-noey')
```

##### SCDL#getStream
*Resolves the ID for a soundcloud track and downloads the song*
__Params__
`id` (Number/String) - A valid Soundcloud Track ID
`callback` (Function) (Optional) - A callback function
__Returns__
`Promise<ReadableStream>` - A ReadableStream containing song data (otherwise returns `Promise<ReadableStream>` to the callback if one is provided)
__Usage__
```js
SoundCloudDownloader.getStream(12345789)
```