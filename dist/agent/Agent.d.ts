export declare class Agent {
    token: string;
    agent_id: string;
    constructor(token: string, agent_id: string);
    dump(text: string, client_id: number, message_type?: number, isCall?: boolean, listener?: defaultListener | null | undefined): void;
    feed(listener: defaultListener | null | undefined): void;
    rating(model_name?: string, listener?: defaultListener | null | undefined): void;
}
