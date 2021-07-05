import request from "request";
import { Constants } from "./Contants";
import { ModelName } from "./ModelName";
import { MessageType } from "./MessageType";

// error export
import { InvalidParameterException } from "../network/ErrorResponse"



export class Agent {
    // initialize variable
    token: string;
    agent_id: string;

    // define constructor
    constructor(token: string, agent_id: string) {
        this.token = token
        this.agent_id = agent_id
    };

    // dump
    dump(text: string, client_id: number, message_type: number = MessageType.Agent, isCall = false, listener: defaultListener|null|undefined=null) {

        // checking input
        if (message_type !== 1 || 0) {
            throw new InvalidParameterException(` invalid input`)
        };

        // check optional parameter for listener
        if (listener !== null) {
            request.post(Constants.dumpEndpoint, {
                json: { "token": this.token, "agent_id": this.agent_id, "client_id": client_id, "message_type": message_type, "text": text, "isCall": isCall },
                headers: {
                    "content-type": "application/json"
                }
            }, (err, res, body) => {
                console.log(res)
                if (err || res.statusCode !== 200) {
                    listener.onError(res.statusCode.toString(), res.body)
                } else {
                    listener.onSuccess(body)
                }
            })
        } else { console.log("Listener is not Defined") };
    }

    // feed
    feed(listener: defaultListener|null|undefined) {

        request.post(Constants.feedEndpoint, {
            json: { "token": this.token, "agent_id": this.agent_id },
            headers: {
                "content-type": "application/json"
            }

        }, (err, res, body) => {
            if (listener == null || listener == undefined) return

            if (err || res.statusCode !== 200) {
                listener.onError(res.statusCode.toString(), res.body)
            } else {
                listener.onSuccess(body)
            }
        })


    }

    // rating listener
    rating(model_name=ModelName.JUPITAV1, listener: defaultListener|null|undefined=null) {
        // checking input
        if (model_name !== (ModelName.JUPITAV1 || ModelName.JUPITAV2)) {
            throw new InvalidParameterException(`${model_name} is a not valid modelname try ${ModelName.JUPITAV1} or ${ModelName.JUPITAV2}`)
        }

        // optional paramater
        if (listener !== null) {
            request.post(Constants.ratingEntpoint, {
                json: {"token": this.token, "agent_id": this.agent_id, "model": model_name},
                headers: {
                    "content-type": "application/json"
                }
            }, (err, res, body) => {
                if(err || res.statusCode !== 200){
                    listener.onError(res.statusCode.toString(), res.body)
                } else {
                    listener.onSuccess(body)
                }
            })
        } else {
            console.log("No listener supplied");
        }

    }
}