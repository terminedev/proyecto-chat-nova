export interface Message {
    author: string,
    date: string,
    messageText: string,
    messageImg: string | null,
}

export interface Chat {
    id: string,
    messages: Message[]
}