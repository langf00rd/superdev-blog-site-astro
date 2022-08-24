---
layout: "../../layouts/BlogPost.astro"
title: "Build A File Sharing Web App"
description: "Let's create a basic file sharing web app for transferring files between devices via a web socket connection."
pubDate: "Jun 23 2022"
banner: "/images/posts/build-a-file-sharing-web-app.webp"
slug: "build-a-file-sharing-web-app"
tags: "build, nodejs, webdev, websockets"
---

Ever wanted to share files from your iPhone to your Windows PC, or from your laptop to another laptop without going through the hard way? In this article, I'm going to walk you through how I built a file-sharing web app with vanilla javascript, Nodejs, express, and the socket io library.

So first open your terminal. We are going to create the project folder. This folder is going to contain the client and the server-side code.

Let's first create the project folder.



```shell
mkdir file-share-app
cd file-share-app
mkdir public

``` 

Next, we initialize our nodejs project by installing the required modules project by running:

```
npm init -y
npm install express socket.io

```

Now we are ready to get into the code. In the **public folder**, create files <em>index.html</em> & <em>client.js</em> then add this boilerplate code in the index.html:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Socket io File sharing</title>
    <style>
        * {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }

        #file-input {
            border: 2px solid #00000026;
            padding: 10px;
            border-radius: 10px;
        }

        #file-input:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }

        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
            /* background: #00e5ff; */
        }

        button {
            padding: 13px;
            background: black;
            border: none;
            width: 140px;
            border-radius: 10px;
            margin-top: 30px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: .3s linear;
        }

        button:hover {
            opacity: 0.5;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <h1>File share 🦄</h1><br><br>
        <input type="file" id="file-input">
        <button id="share-btn">Share this file 🚀</button>
        <div class="dynamic-content"></div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="client.js"></script>
</body>
</html>

```

You should see something like this when you run `node index` from the terminal.


![Screenshot.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1639923219005/pQe7-nXA1.png)


In the <em>client.js</em> file, we will get all the required html elements and also initialize our socket io connection by adding ` const socket = io() `

```javascript
const fileInputElement = document.getElementById('file-input')
const shareButton = document.getElementById('share-btn')
const dynamicContent = document.querySelector('.dynamic-content')
const socket = io()

window.addEventListener('load', () => {
     // run on page load
})

function downloadFile(blob, name = 'shared.txt') {
     // force download received file
}

shareButton.addEventListener('click', async () => {
      // handle share button press
})

```

Open index.js from the root directory and add this code to create our web server:

```javascript
const path = require("path")
const http = require("http")
const express = require('express')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, "/public")

app.use(express.static(publicDirPath))

server.listen(port, () => {
    console.log(`server running on port ${port}! 🦄`)
})

```

This will display the index.html file when you navigate to `localhost://3000` from your browser.

Let's initialize socket io from the server. So in the <em>index.js</em>, add these lines:

```javascript
const socketio = require('socket.io')
const io = socketio(server)


```

Now let's handle socket events when a user connects or disconnects from the server. Still in the <em>index.js</em>:

```javascript
io.on("connection", (socket) => {
    console.log('client connected 🎉', socket.id)

    socket.on('disconnect', () => {
        // execute callback when client disconnects from server
        console.log('client left the socket 😢', socket.id)
    })
})

```

Our <em>index.js</em> should now look like this:

```javascript
const path = require("path");
const http = require("http");
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "/public");

app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
    console.log('client connected 🎉', socket.id);

    socket.on('disconnect', () => {
        console.log('client left the socket 😢', socket.id);
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})


```

Now let's start sharing files by handling the file input.

```javascript
shareButton.addEventListener('click', async () => {

    if (fileInputElement.files.length === 0) {
        alert('Choose the file you want to send 📁')
        return;
    }

    let file = fileInputElement.files[0]
    let reader = new FileReader()

    reader.onload = () => {
       // reader is loaded and ready
    }

    reader.readAsArrayBuffer(file)
})

```

The `new FileReader()` object allows our app to asynchronously read the contents of the file selected from the HTML input element. The `reader.readArrayAsArrayBuffer(file) returns partial Blob data representing the number of bytes currently loaded as a fraction of the total.

For the app to work, we need to wait for the FileReader object to load. This is why we added `reader.onload` function. In the `reader.onload`, we call a function to start sharing the file with the socket.

```javascript
reader.onload = () => {
      let buffer = new Uint8Array(reader.result)
      initFileShare({ filename: file.name, bufferSize: buffer.length }, buffer)10
}


```

The `initFileShare` method accepts two arguments; the `metadata` and the `buffer` of the current chunk. The `metadata` object takes the `filename` and the `bufferSize`. We pass the bufferSize so we can check the complete size of the file and also track whether or not the file has been completely received. You can track the progress of the file share process, but it's beyond the scope of this article.

In the `initFileShare` function, we do what I normally call **'chunking'** where we break the file into smaller 1Mb sized raw binary data chunks. Why do we perform chunking? Socket io and nodejs by default depend on memory to run asynchronous processes. And if the overall memory is used up the whole app crashes.  So if we send the whole file in its raw large state, the server will overload and crash.

> You can decide not to break the file into smaller buffers if only you are sharing files below 1Mb

In the `initFileShare` function:

```javascript
function initFileShare(metadata, buffer) {
    socket.emit('file-metadata', metadata)

    let chunkSize = 1024
    let initialChunk = 0

    while (initialChunk < metadata.bufferSize) {

        let filePiece = buffer.slice(0, chunkSize)
        console.log(metadata.bufferSize, filePiece.length)

        socket.emit('file-chunk', filePiece)

        initialChunk++;
    }
}

```

The `socket.emit('file-metadata', metadata)` line emits the metadata of the file to the WebSocket. We use a <em>for</em> loop to emit the `file-chunk` event for every received chunk. The chunks will then be compiled and converted back into the complete file when received.

Open the <em>index.js</em> file:

```javascript
io.on("connection", (socket) => {
    console.log('client connected 🎉', socket.id);

    socket.on('file-metadata', metadata => {
        socket.broadcast.emit('file-metadata', metadata)
    })

    socket.on('file-chunk', chunk => {
        socket.broadcast.emit('file-chunk', chunk)
    })

    socket.on('disconnect', () => {
        console.log('client left the socket 😢', socket.id);
    })
})

```

Here we are listening for the `file-metadata` & `file-chunk` events from the client. When the server receives such events, we use the `socket.broadcast.emit` method to broadcast the data to all connected clients except the sender. At this point, the server is done. So let's go back to the <em>client.js</em>.

We listen for server-side events when the window is loaded `window.addEventListener('load', () => {})` because socket io only needs to connect to the server once. Add this code to listen for server socket events:

```javascript
window.addEventListener('load', () => {
    let newFile = {
        buffer: [],
        metadata: null
    }

    socket.on('file-metadata', metadata => {
        // received metadata ⚡️
    })

    socket.on('file-chunk', chunk => {
        // received chunk ⚡️
    })
})

```

`socket.on()` takes in a custom event name and a callback function which sometimes contains data from the server. In our case, the `file-metadata` event contains the metadata (filename, bufferSize) and the `file-chunk` event contains the chunk. Now let's listen for the file metadata and insert it into the `newFile` object.

```javascript
socket.on('file-metadata', metadata => {
     // received metadata ⚡️
     newFile.metadata = metadata
     newFile.buffer = []

     console.log('received metadata ⚡️')
})

```

When we receive a chunk:

```javascript
socket.on('file-chunk', chunk => {
      /** Use the dynamicContent.innerHTML to show an HTML element to the user when a chunk is received. 
      You can track, calculate and display progress
      dynamicContent.innerHTML = `<b></b>`
      **/

        newFile.buffer.push(chunk)

        if (newFile.buffer.length === newFile.metadata.bufferSize) {
            // complete file has been received
            let receivedFile = new Blob(newFile.buffer)
            downloadFile(receivedFile, newFile.metadata.filename);

            newFile = {}
            alert('Yayy! File received 🎉')
        }
    })

```

When a chunk is received, the `newFile.buffer.push(chunk)` adds the new chunk to the `newFile`'s <em>buffer</em> array. We do this so that we can rebuild the complete file with everything in place.
`new Blob(newFile.buffer)` creates a new `Blob` from the array of buffers so we can download later.

The `downloadFile()` function takes the Blob and the file name. At this point, the complete file has been received and is ready to be downloaded. So let's add the code which downloads the file:

```javascript
function downloadFile(blob, name = 'shared.txt') {

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    document.body.removeChild(link);
}

```

The above function creates a DOMString containing a URL representing the file Blob object given in the parameter. An invisible anchor tag containing the Blob of the received file is created. We then force-click the anchor tag with the `MouseEvent`'s click event. The anchor tag is removed afterward. So when the whole file is received, it is automatically downloaded with the filename.


### Final words
You can host this project on [Heroku](heroku.com) or use the  [localtunnel](https://localtunnel.github.io/www/) tool to get a temporal web URL for the project. You can add some cool features like joining rooms or showing a progress indicator when sending or receiving files.

Open `localhost://3000` in two tabs and try sending a file from one 🦄🎉.


### Summary

Have fun sharing your files. I hope you liked this article 🔥🔥🔥.

Follow me on 

Twitter 👉🏼 [@langford_dev](https://twitter.com/langford_dev)

YouTube channel 👉🏼 [LangfordDev](https://www.youtube.com/c/langfordDev)
