# Copyright 2022 Cartesi Pte. Ltd.
#
# SPDX-License-Identifier: Apache-2.0
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

from os import environ
import logging
import requests
import csv
import io

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")

def parse_csv_payload(payload):
    # Parse the CSV data
    csv_file = io.StringIO(payload)
    reader = csv.DictReader(csv_file)
    csv_data = [row for row in reader]
    return csv_data

def handle_advance(data):
    logger.info(f"Received advance request data {data}")
    csv_payload = data["payload"]
    csv_data = parse_csv_payload(csv_payload)

    # Process each line of the CSV
    for row in csv_data:
        notice = {"payload": row}
        response = requests.post(rollup_server + "/notice", json=notice)
        logger.info(f"Received notice status {response.status_code} body {response.content}")
    
    return "accept"

def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    csv_payload = data["payload"]
    csv_data = parse_csv_payload(csv_payload)

    # Process each line of the CSV
    for row in csv_data:
        report = {"payload": row}
        response = requests.post(rollup_server + "/report", json=report)
        logger.info(f"Received report status {response.status_code}")
    
    return "accept"

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}

# Reading the CSV file
csv_file_path = "assets/logs/log.csv"  # Substitute this with the path to your CSV file
with open(csv_file_path, mode='r') as file:
    csv_content = file.read()

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        
        # Include the CSV content in the payload data
        data["payload"] = csv_content
        
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(data)
