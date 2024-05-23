import os
from time import sleep


os.chdir("/mnt/c/users/Gabriel/Documents/rollups-examples/echo-python")
while 1:
    os.system("yarn start input send --payload row")
    sleep(10)