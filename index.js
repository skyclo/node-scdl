/**
 * 1.0.0 Rev. 2020 Mar 31
 * 
 * node-scdl
 * An easy to use, minimal dependency Soundcloud song downloader.
 * 
 * 
 * Copyright (C) 2019-2020 Skyclo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */


const p = require('phin')

module.exports = class SCDL {
    /**
     * Creates a new instance of the Soundcloud Downloader
     * @param {String} clientID - A valid Soundcloud-API-V1 Client ID
     */
    constructor (clientID) {
        this.clientID = clientID
        if (typeof this.clientID !== 'string') throw new TypeError('SoundCloud API Error: Invalid Client ID (expected type: String | recieved type: ' + typeof this.clientID + ')')
    }

    /**
     * Gets all of the Soundcloud Metadata for the track
     * @param {Number|String} id - A valid Soundcloud Track ID
     * @param {Function} [cb=null] - A callback function
     * @returns {Promise<JSON>} Soundcloud Track Metadata 
     */
    async getInfo (id, cb) {
        const info = await p({
            url: `https://api.soundcloud.com/tracks/${id}.json?client_id=${this.clientID}`, 
            method: 'GET',
            followRedirects: true,
        })
        
        if (cb) cb(JSON.parse(Buffer.from(info.body).toString())); else return JSON.parse(Buffer.from(info.body).toString())
    }

    /**
     * Accepts the URL and resolves it to an ID that can be used with other SCDL functions
     * @param {String} url - A valid Soundcloud URL
     * @param {Function} [cb=null] - A callback function
     * @returns {Promise<Number>} The ID of the track
     */
    async getID (url, cb) {
        const info = await p({
            url: `http://api.soundcloud.com/resolve.json?url=${url}&client_id=${this.clientID}`, 
            method: 'GET',
            followRedirects: true,
        })
        
        if (cb) cb(JSON.parse(Buffer.from(info.body).toString()).id); else return JSON.parse(Buffer.from(info.body).toString()).id
    }

    /**
     * Resolves the ID for a soundcloud track and downloads the song
     * @param {Number|String} id - A valid Soundcloud Track ID
     * @param {Function} [cb=null] - A callback function
     * @returns {Promise<ReadableStream>} A readable PCM Stream
     */
    async getStream (id, cb) {
        let stream = await p({
            url: `http://api.soundcloud.com/tracks/${id}/stream?consumer_key=${this.clientID}`,
            method: 'GET',
            followRedirects: true,
        })

        if (cb) cb(stream); else return stream
    }
} 