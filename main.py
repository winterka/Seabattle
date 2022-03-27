import asyncio

import websockets

all_clients = []
print("New message")

async def send_message(message: str):
    for client in all_clients:
        await client.send(message)


async def new_client(client_socket: websockets.WebSocketClientProtocol, path: str):
    print("New connected")
    all_clients.append(client_socket)

    while True:
        new_message = await client_socket.recv()
        #print("New message", new_message)
        if new_message != "":
            await send_message(message=new_message)

async def start_server():
    await websockets.serve(new_client, '127.0.0.1', 8080)


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(start_server())
    loop.run_forever()
