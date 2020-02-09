import os
import signal
import sys
from pathlib import Path
from multiprocessing import Process


def signal_handler(sig, frame):
    print('Closing servers...')
    # p.terminate()
    sys.exit(0)


def runNPM():
    frontendfolder = Path("client")
    full_command = "npm start --prefix " + str(frontendfolder)

    os.system(full_command)


if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    p = Process(target=runNPM, args=())
    p.start()



    run_server = "python manage.py runserver"


    os.system(run_server)
    p.join()