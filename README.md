
![npm](https://img.shields.io/npm/v/@jupita/jupita-agent-sdk)

# Jupita Agent TypeScript SDK

This library will allow you to make API calls with Jupita Agent. This SDK fully supports the 3 APIs available for Jupita Agent. All API calls are made asynchronously, thus there are event listeners available to handle the API results.

## APIs
There are 3 APIs within the Juptia Agent product – `dump` `rating` & `feed`:

- Dump allows you to send the utterances you wish to send.
- Rating allows you to retrieve the rating for the agent in question.
- Feed provides you with some basic rating analytics.


##  Quickstart

### Installation

```
npm install @jupita/jupita-agent-sdk
```


The first step is to initialize the SDK and add the required authentication parameters such as `token`, `agentId` then, initialize the class object.

### Initialization

```
var jupita = require("@jupita/jupita-agent-sdk")
var token = "some token"
var agentId = "111"
var client = new jupita.Agent(token, agentId)
```


### Call `Dump` API

`dump` has an optional parameter when it is not supplied, the default parameters is;

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

If the API returns 200 the response is an object;

```
{
"message": "Dumped Conversation",
"score": 62.0781855859
}
```

### Call `Feed` API


```
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


If the API returns 200 the response is an object;

```
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

Calling the `rating` API then becomes simple as it already has the required built-in parameters, such as;

* `model_name` with a default value `JupitaV1`
* `listener` if not defined you will receive a `Rating` value of `Null`.


You can call this method with;

```
agent.rating()
```
or

```
agent.rating(ModelName.JUPITA1)
```
or

```
agent.rating(ModelName.JUPITA1, listener)
```

If the API returns 200 the response is a JSON with;

```
{
  "rating": 41.6108763005
}
```

## Error Codes

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

## Libraries

Use Step [Initialization](###initialization) so
that the Jupita Agent Web SDK is available within the scope of the project.


## Classes

The available product under the Jupita Agent Web SDK is call [read this](###initialization).

## Error Handling

The SDK has an `InvalidParameterException` exception that will arises when:
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

```
rating(model_name=ModelName.JUPITAV1, listener: defaultListener|null|undefined=null)
```
The second rating definition is created for future use when there will be multiple models to choose from. At the moment only 1 model (*JupitaV1*) is supported. 

To avoid illegal argument error use `ModelName.JUPITAV1` for the modelName. 

`DefaultListener` is an interface which needs to be implemented to listen to results of the `rating` call.

### `Feed` Method Definition

```
feed(listener: defaultListener)
```

`DefaultdListener` is an interface which needs to be implemented to listen to results of the feed call.
