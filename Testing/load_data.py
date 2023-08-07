import json


# load data from restapi_data.json as a dictionary to facilate accessing into the data and getting it
def get_data():
    with open('resapi_data.json') as data_file:
        data = json.load(data_file)
    return data


restapi_test_data = get_data()
