import {Agent} from './agent/Agent'

var agent = new Agent("87e96f474b9bbd4a67c4cea97990ad322a665adaa244aeef716b2f78b3766ca3", "ihfazh")


agent.dump("welcome to this app", 1, 1, false, {
    onError: function(statusCode, response){
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: function(week){
        console.log(week)

    }
})

agent.feed({
    onError: function(statusCode, response){
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: function(week){
        console.log(week)

    }
})

// rating
agent.rating()