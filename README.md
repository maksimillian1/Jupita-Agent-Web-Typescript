
![npm](https://img.shields.io/npm/v/@jupita/jupita-agent-sdk)

# Jupita Agent Typescript SDK

This library will allow you to make API calls with Jupita Agent. This SDK fully supports the 3 APIs available for Jupita Agent. All API calls are made asynchronously, thus there are event listeners available to handle the API results.

## Overview
Jupita Agent is an API product that provides deep learning powered analysis of conversational data, via many mediums, between an agent and client. Within the SDK documentation, `message_type` will simply refer to who is speaking. `Message_type` '0' = `agent`, and `message_type` '1' = `client`, although these labels are handled by the SDK.

The required parameters for the APIs include setting `message_type`, along with assigning an `agent_id` + `client_id` to be passed - how this is structured or deployed is dependent on your systems/platforms architecture, therefore it is completely flexible and customisable. Please note when assigning the `agent_id` that no data will be available for that particular agent from any of the APIs until the agent has sent at least 1 utterance via the `dump` API. 

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


The first step is to initialize the SDK and add the required authentication parameters such as `token`, `agent_id` then, initialize the class object.

### Initialization

```
var jupita = require("@jupita/jupita-agent-sdk")
var token = "authentication token"
var agentId = "2"
var agent = new jupita.Agent(token, agentId)
```


### Call `Dump` API

When calling the `dump` API, for example from a conversation with '3' being the `client_id` and the message being "hello", you should specify the `text`, `client_id`, and the `message_type` (since message dumps are seen as by default from an agent unless otherwise specified) parameters sequentially;

```
agent.dump("Hello", 3, MessageType.Client)
```

When you want to dump a message from an audio call (`isCall`) conversation, you may add an additional boolean parameter. `true` meaning the message is from an audio call, and `false` meaning it is not;

```
agent.dump("Hello", 3, MessageType.Client, true)
```

Currently, as there is no data logged into the console (as you did not define a listener), you may define as per below;

```
agent.dump("Hello", 3, MessageType.Client, true, {
    onError: function(statusCode, response){
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: function(week){
        console.log(week)

    }
})
```

However, the only required parameters are the `text` and the `client_id` parameters. If you do not specify others, below are the assumptions;

- `message_type` is `MessageType.Agent`, meaning that the message has come from an agent,
- `isCall` is `false`,
- `listener` is null, so no listener called.

If the API returns 200 the response is a JSON object;

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


If the API returns 200 the response is a JSON object;

```
{
"best day": null,
"day difference": null,
"month difference": null,
"week difference": null,
"worst day": null
}
```

When you make a `feed` API request, you may pass a listener parameter as above, however the listener parameter is optional. You may skip this and call `agent.feed()`.

### Call `Rating` API

Calling the `rating` API then becomes simple as it already has the required built-in parameters, such as;

* `model` name with a default value `JupitaV1`
* `listener` if not defined you will receive a `rating` value of `null`.


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

If the API returns 200 the response is a JSON object with;

```
{
  "rating": 41.6108763005
}
```

## Error Codes

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

## Error Handling

The SDK has an `InvalidParameterException` exception that will arises when:
- `message_type` parameter in the `dump` method is not `1` or `0`
- `model` name parameter in the `rating` method is not `JupitaV1` or `JupitaV2`


## Libraries

Use Step [Initialization](#initialization) so
that the Jupita Agent Web SDK is available within the scope of the project.


## Classes

The available product under this SDK is Jupita Agent. You may construct Jupita Agent by the public constructor and pass the two required parameters:

- Your authentication token,
- Your `agent_id`.

Then, [initialize](#initialization).

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
