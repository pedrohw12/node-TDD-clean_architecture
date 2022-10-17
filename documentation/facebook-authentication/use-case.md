# Authenticate with Facebook

## Data:
* Access Token

## Primary flow
1. Get data (name, email and Facebook ID) from Facebook's API
2. Check if there is an existing user with the received email
3. Create an account to the user with the data received from Facebook
4. Create an access token, from the user's ID, with 30 min expiration
5. Return the generated access token

## Alternative Flow: User already exists
3. Update the user's account with the received data from Facebook (Facebook ID and name - update name only if the account has no name yet)

## Exception Flow: Invalid token or expired
1. Return an auth error
