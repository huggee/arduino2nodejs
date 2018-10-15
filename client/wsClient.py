import websocket
import thread
import time
import sys
import serial
import serial.tools.list_ports
import pdb


# url = 'ws://localhost:3000/'
url = 'ws://wsserver2arduino-demo.azurewebsites.net/'

def on_message(ws, message):
    print(message)
    if message == 'state1':
        my_serial[0].write('L')
        my_serial[1].write('\n')
    elif message == 'state2':
        my_serial[0].write('\n')
        my_serial[1].write('L')
    elif message == 'state3':
        my_serial[0].write('\n')
        my_serial[1].write('\n')
        my_serial[0].write('U')
        my_serial[1].write('U')
        rec = my_serial[0].readline()
        print(rec)
        rec = my_serial[1].readline()
        print(rec)
        my_serial[0].write('\n')
        my_serial[1].write('\n')
        for i in range(20):
            my_serial[0].write('D')
            my_serial[1].write('D')
        my_serial[0].write('\n')
        my_serial[1].write('\n')
        # for i in range(20):

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("#################")
    print("###  See You  ###") 
    print("#################")

def on_open(ws):
    print("#################")
    print("###   Hello   ###")
    print("#################")

    # #### connection test
    # def run(*args):
    #     for i in range(3):
    #         ws.send("Hello %d" % i)
    #         time.sleep(1)
    #     time.sleep(1)
    #     print("Thread terminating...")
    # thread.start_new_thread(run, ())

if __name__ == '__main__':
    my_serial = []

    for d in serial.tools.list_ports.comports():
        dtype = d.usb_description()
        if dtype and 'Arduino' in dtype:
            my_serial.append(serial.Serial(port=d[0], baudrate=115200))

    my_serial[0].write('L')
    my_serial[1].write('L')

    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(url,
                                on_message=on_message,
                                on_error=on_error,
                                on_open=on_open,
                                on_close=on_close)
    ws.run_forever()
