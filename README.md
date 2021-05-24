
# Getting Started with Jupita Agent Web TypeScript

---

This library is used to make API calls that will be used by the Jupita Agent, fully supports the 3 APIs available for Jupita Agent, 
here are the APIs provided

* `Dump`: allows you to send the utterances you wish to send.
* `Rating`: allows you to retrieve the rating for the agent in question.
* `Feed`: provides you with some basic rating analytics




### Installation

---

jupita Agent Web Typescript SDK installation guide

# QuickStart

the first step is initialize the SDK and add required auth like `token`, `agentId` then initialize the class object

### Initialization

add required auth 

```js
var token = "some token"
var agentId = "111"
var client = JupitaClient(token, agentId)
```



### Call `Dump` API

`dump` has a optional parameter when it is not supplied, it defaults to

```js
{
    userType: UserType.Agent,
    callback: function(error, succcess){
        //
    }
}
```

Call the dump API as a message from Agent by specifying the message and clientId below;

```js
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
in dump method have a default parameter like

* text (*required*)
* client_id (*required*)
* message_type (optional, default = Agent)
* isCall (optional, default=false)
* listener (optional, if not defined then the API will not be called, it will return the response `Listener is not Defined`)

If the API returns 200 the response is a JSON with

```json
{
"message": "Dumped Conversation",
"score": 62.0781855859
}
```

### Call `Feed` API

Call the feed API

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


If the API returns 200 the response is a JSON with

```js
{
"best day": null,
"day difference": null,
"month difference": null,
"week difference": null,
"worst day": null
}
```

### Call `Rating` API

to call the API rating is quite easy because it already has built-in parameters such as

* `model_name` with a default value `JupitaV1`
* `listener` if not defined you got `Rating api value is Null`

If the API returns 200 the response is a JSON with

you can call this method with

```js
agent.rating()
```

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

### Error Code

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

### Library

Use Step [Initialization](###initialization)
that the Jupita Agent Web SDK is available within the scope of the project 


### Classes

The available product under the Jupita Agent Web SDK is call [read this](###initialization) 

### Error Handling

the SDK have `InvalidParameterException` this arises if the message type set in the dump method is not 1 or 0, or the model name in rating method is not `JupitaV1`.

### Class Method Definition

#### `Dump` Method Definition

```js
dump(text: string, client_id: number, message_type: number = MessageType.Agent, isCall = false, listener: defaultListener|null|undefined=null)
```

* text (required)
* client_id (required)
* message_type (optional, default = Agent)
* isCall (optional, default=false)
* listener (optional)

If the values of type and `isCall` are not provided by default the values are considered as `MessageType.Agent` and false. Thus `text` and the `clientId` are essential when creating a dump request

#### `Rating` Method Definition

```js
rating(model_name=ModelName.JUPITAV1, listener: defaultListener|null|undefined=null)
```
The second rating definition is created for future use when there will be multiple models to choose from. At the moment only 1 model (*JupitaV1*) is supported. To avoid illegal argument error use `ModelName.JUPITAV1` for the modelName. `DefaultListener` is an interface which needs to be implemented to listen to results of the rating call

#### `Feed` Method Definition

```js
feed(listener: defaultListener)
```

`DefaultdListener` is an interface which needs to be implemented to listen to results of the feed call. The onSuccess event returns the feed for the whole week as a JSONObject.