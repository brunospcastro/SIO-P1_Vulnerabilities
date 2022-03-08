# project-1---vulnerabilities-equipa_7
## Description
Simple Album shop, made just to test security features, below there's a list of the expected funcionality

For more details about this application and it's purpose, please refer to the Report contained in the root dir of the repository.

## Funcionality:
      .Register
      .Login
      .Adding albums by accounts with admin status only
      .Adding reviews on an album
      .Displaying all the reviews on a given album
      .Change password for a given user
      .Passwords must be 6-20 Chars long,must have a integer and an Uppercase letter.
      .Passwords are hashed and then saved on db (on the secure version)
      .Store front, where all the album on the db are shown
      .Search bar funcionality on the store route



## Vulnerabilities :

      Sql injection   - CWE-89
      Cross-Scripting (Stored) - CWE-79
      Cross-Scripting (Reflected) - CWE-79
      Weak Password Requirements - CWE-521
      Exposure of Sensitive Information to an Unauthorized Actor - CWE 200
      Unverified Password Change - CWE-620
      Plaintext Storage of a Password - CWE-256
      
(Read the report for in-depth details about this vulnerabilities and how they can be exploited in our insecure app)

## Extra
	
	.There's a simple and rudimentar python scrypt to demonstrate the importance of strong passwords

## Authors:

	Filipe Pires,80063
	Diogo Maduro,80233
	Bruno Castro,80190
	Gonçalo Arieiro,80130
	
