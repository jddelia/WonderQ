# WonderQ Server

## Install

`git clone https://github.com/jddelia/WonderQ`

`cd WonderQ`

`npm install`

`npm start`

## Documentation

### Endpoints

`GET: /items/all`

This endpoint returns all the items, currently in the queue.

`GET: /items/active`

This endpoint returns all the active items, currently in the queue.

`POST: /new/message`

This endpoint adds a new message into the queue, and it returns { messageId: "id" }. Content-Type: application/x-www-form-urlencoded. Message is processed after 8 seconds.

### Known Issues

There is a bug which can occur, if system crashes, after setting the "active:true", during the consumer processing. A solution would be to create a model to store those error items, with a retry limit.

## Scaling

This system can be scaled by adding more servers and balancing traffic, to handle increased load. It can also be scaled vertically, by increasing server capacity. 