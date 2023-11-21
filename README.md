# ChatGPT-Nothing-Went-Wrong
Custom JS script for Tampermonkey\Greasemonkey extension that solves the problem of "Oops, an error occurred!" message in some cases.

After the ChatGPT design update, some users (like myself) experienced the problem of not being able to open or create a chat tab on Open AI's website and receiving an error message that generally says nothing about the cause of the problem.
For example, something like this:
![image](https://github.com/mihannnik/ChatGPT-Nothing-Went-Wrong/assets/48869235/d47de328-25fc-4ab4-bc76-da9bbbbe42a7)

After some searching I managed to find a [thread on the site forum](https://community.openai.com/t/oops-an-error-occurred-try-again/494071), where ["andykras"](https://community.openai.com/t/oops-an-error-occurred-try-again/494071/5) indicated that the problem is related to a request to one of the API servers resulting in an invalid response containing invalid fields.

A bit later, I noticed a post by ["laurent4671" in which he suggested a script](https://community.openai.com/t/oops-an-error-occurred-try-again/494071/81) for the Greasemonkey extension that substitutes a specific server response for a valid one and thus bypasses the error that is caused by the actual response from the server.

However, for me and a [few other people](https://community.openai.com/t/oops-an-error-occurred-try-again/494071/102), the solution didn't work because there simply wasn't a function call to intercept messages from the server. But that was enough for me to implement a solution using a different approach that I had used before.

Now that we're done reviewing and giving glory to whoever deserves it, I'll move on to preparation. I'm pretty sure that the error is not always just due to an incorrect server response, but if you think this solution might help you, first of all, go to the site, log in to your account and open the browser console (F12 usually).  Make sure you are on the Console tab and reload the page. If you see the following errors in the console, this solution may help you:

![image](https://github.com/mihannnik/ChatGPT-Nothing-Went-Wrong/assets/48869235/6ee67a06-cff9-425d-a7df-b7f28ceb9444)

If you have this exact error message, you can try this solution, however, read the warning below.

## Attention!
Installation of this script is at your own risk! The author is not responsible for unintentional disclosure of your data or loss of your data! This solution uses [unsafeWindow](https://www.tampermonkey.net/documentation.php?locale=en#api:unsafeWindow), which can lead to unauthorized access of scripts and extensions to places they could not otherwise access! I can't be sure it won't lead to anything, so I'm warning you of possible problems (to be honest, I don't fully understand what can be accessed this way, but they don't call it an unsafe window for nothing).

However, I hasten to point out that this solution itself does not send anything anywhere and I do not receive any data from the end user of this script. In any case, I recommend you to read the script code before installing it.

## Installing
To install, simply follow [this link](https://github.com/mihannnik/ChatGPT-Nothing-Went-Wrong/raw/main/ChatGPTFix.user.js) and if you have the Tampermonkey or Greasemonkey extension installed, the script installation page will open. On this page you can examine the code and permissions, and accept or decline the installation.

## Afterword
I'm not a good JS developer, I just like to occasionally create custom scripts to automate work on websites. Moreover, I'm not familiar with JS libraries like Bootstrap or jQuery, and I'm used to implementing everything with vanilla JS. My style may be bad and implementation may not be the best, but you can point it out or make a better.

Although I had already used the implementation of replacing the request function, after checking the idea, I realized that it worked, but not entirely, so the script was repaired using ChatGPT, so, to some extent, the site repaired itself.
