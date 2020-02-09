# importing the requests library
import requests
import json

'''
Once we receive test email and password information we will replace them within the respective
unit tests

Make sure the HackRU backend is running and the mentorQ backend is running in order to perform these tests
'''


def connectToLCS(email, password):
    # defining a params dict for the parameters to be sent to the API
    PARAMS = {'email': email,
              'password': password}

    # sending get request and saving the response as response object
    result = requests.post(url='http://api.hackru.org/prod/authorize', data=json.dumps(PARAMS))
    assert (result is not None)
    return result


def connectToMentorq(email, LCStoken):
    # defining a params dict for the parameters to be sent to the API
    PARAMS = {'email': email,
              'lcs_token': LCStoken}

    # sending get request and saving the response as response object
    result = requests.post(url='http://127.0.0.1:8000/api/auth/token/', data=PARAMS)
    assert (result is not None)
    return result


'''
 Tests if given a generic user that exists in LCS we will be able to correctly identify it they have
 valid token credentials
'''


def testUserValidity():
    print("Testing if we can correctly identify if someone is a user... 'testUserValidity' ")
    email = ""
    password = ""

    result = connectToLCS(email, password)
    resultJson = result.json()
    # received the auth token from LCS
    authToken = resultJson['body']['auth']['token']

    # test the mentorq backend
    mentorqResult = connectToMentorq(email, authToken)
    try:
        mentorqJson = mentorqResult.json()
        print("Successfully recognized user correctly")
    except:
        print("Could not recognize user for authentication")


'''
 Tests if we will be able to correctly identify someone as a mentor within LCS via mentorq
'''


def testMentorValidity():
    print("Testing if we can correctly identify if someone is a mentor... 'testMentorValidity' ")
    email = ""
    password = ""

    result = connectToLCS(email, password)
    resultJson = result.json()
    # received the auth token from LCS
    authToken = resultJson['body']['auth']['token']

    # test the mentorq backend
    mentorqResult = connectToMentorq(email, authToken)
    mentorqJson = mentorqResult.json()
    try:
        if mentorqJson['mentor']:
            print("Successfully recognized mentor correctly")
        else:
            print("Misidentified mentor status")
    except:
        print("Could not recognize mentor for authentication")


'''
 Tests if we will be able to correctly identify someone as a director within LCS via mentorq
'''


def testDirectorValidity():
    print("Testing if we can correctly identify if someone is a director... 'testDirectorValidity' ")
    email = ""
    password = ""

    result = connectToLCS(email, password)
    resultJson = result.json()
    # received the auth token from LCS
    authToken = resultJson['body']['auth']['token']

    # test the mentorq backend
    mentorqResult = connectToMentorq(email, authToken)
    mentorqJson = mentorqResult.json()
    if mentorqJson['director']:
        print("Successfully recognized director correctly")
    else:
        print("Misidentified director status")


if __name__ == '__main__':
    try:
        testUserValidity()
    except:
        print("Failed user validity test")
    print()

    try:
        testMentorValidity()
    except:
        print("Failed mentor validity test")
    print()

    try:
        testDirectorValidity()
    except:
        print("Failed director validity test")
    print()