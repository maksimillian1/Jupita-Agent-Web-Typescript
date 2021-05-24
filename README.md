
![npm](https://img.shields.io/npm/v/@jupita/jupita-agent-sdk)

# Getting Started with Jupita Agent Web TypeScript

This library is used to make API calls that will be used by the Jupita Agent, fully supports the 3 APIs that available for Jupita Agent.

## APIs
There are 3 APIs within the Jupita Agent product:
* `Dump`: allows you to send the utterances you wish to send.
* `Rating`: allows you to retrieve the rating for the agent in question.
* `Feed`: provides you with some basic rating analytics


##  QuickStart

### Installation

```
npm install @jupita/jupita-agent-sdk
```


The first step is initialize the SDK and add required auth like `token`, `agentId` then initialize the class object

### Initialization

```
var jupita = require("@jupita/jupita-agent-sdk")
var token = "some token"
var agentId = "111"
var client = new jupita.Agent(token, agentId)
```


### Call `Dump` API

`dump` has an optional parameter when it is not supplied, the default parameters is

```
{
    userType: UserType.Agent,
    callback: function(error, succcess){
        //
    }
}
```

Call the dump API as a message from Agent by specifying the message and clientId below;

```
agent.dump("welcome to this app", 1, 1, false, {
    onError: function(statusCode, response){
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: function(week){
        console.log(week)

    }
})
```

Parameters:

* text (*required*)
* client_id (*required*)
* message_type (optional, default = Agent)
* isCall (optional, default=false)
* listener (optional, if not defined then the API will not be called)

If the API returns 200 the response is an object

```json
{
"message": "Dumped Conversation",
"score": 62.0781855859
}
```

### Call `Feed` API


```js
agent.feed({
    onError: function(statusCode, response){
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: function(week){
        console.log(week)

    }
})
```


If the API returns 200 the response is an object

```js
{
"best day": null,
"day difference": null,
"month difference": null,
"week difference": null,
"worst day": null
}
```

The parameter is optional. You can also call it by `agent.feed()`

### Call `Rating` API

To call the API rating is quite easy because it already has built-in parameters such as

* `model_name` with a default value `JupitaV1`
* `listener` if not defined you got `Rating api value is Null`


you can call this method with

```js
agent.rating()
```
or

```js
agent.rating(ModelName.JUPITA1)
```
or

```js
agent.rating(ModelName.JUPITA1, listener)
```

If the API returns 200 the response is a JSON with

```js
{
  "rating": 41.6108763005
}
```

## Error Codes

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

## Libraries

Use Step [Initialization](###initialization)
that the Jupita Agent Web SDK is available within the scope of the project 


## Classes

The available product under the Jupita Agent Web SDK is call [read this](###initialization) 

## Error Handling

The SDK have an `InvalidParameterException` exception that will arises when:
- `message_type` parameter in the `dump` method is not `1` or `0`
- `model name` paramter in the `rating` method is not `JupitaV1` or `JupitaV2`



## Class Method Definition

### `Dump` Method Definition

```
dump(text: string, client_id: number, message_type: number = MessageType.Agent, isCall = false, listener: defaultListener|null|undefined=null)
```

* text (required)
* client_id (required)
* message_type (optional, default = Agent)
* isCall (optional, default=false)
* listener (optional)

To avoid illegal argument error for the `message_type` argument, use `MessageType.Agent` for agent, and `MessageType.Client` for client.

### `Rating` Method Definition

```js
rating(model_name=ModelName.JUPITAV1, listener: defaultListener|null|undefined=null)
```
The second rating definition is created for future use when there will be multiple models to choose from. At the moment only 1 model (*JupitaV1*) is supported. 

To avoid illegal argument error use `ModelName.JUPITAV1` for the modelName. 

`DefaultListener` is an interface which needs to be implemented to listen to results of the rating call

### `Feed` Method Definition

```
feed(listener: defaultListener)
```

`DefaultdListener` is an interface which needs to be implemented to listen to results of the feed call.