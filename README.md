# Using the Synonym App to Find Synonyms

The Synonym app allows you to find synonyms for any word or phrase quickly and easily. Whether you're writing an essay
or looking to expand your vocabulary, the Synonym app can help you find the right words to express yourself.

## Prerequisites

Before using the Synonym app, you must have access to the internet and a web browser.

## Procedure

Follow these steps to use the Synonym app:

1. Open the Synonym app in your web browser by navigating to http://gericomplicated.com/.
2. Once the app has loaded, you will see a text input field with a "Get Synonyms" button next to it.
3. Enter a word or phrase in the text input field for which you would like to find synonyms.
4. Click the "Get Synonyms" button to generate a list of synonyms for the word or phrase you entered.
5. If there are any errors, an error message will be displayed. Check the message and try again with a different word if
   necessary.
6. If there are at least 3 synonyms found for the word, a list of up to 10 synonyms will be displayed below the input
   field.
7. If there are fewer than 3 synonyms found, an error message will be displayed indicating that the list must be at
   least 3, and no synonyms will be displayed.
8. To generate synonyms for a new word, simply clear the input field and repeat the process.

## Results

The Synonym app will display a list of synonyms for the word or phrase you entered, provided that at least 3 synonyms
are found. You can use these synonyms to improve your writing or expand your vocabulary. If the list of synonyms is less
than 3, an error message will be displayed indicating that the list must be at least 3. You can then try again with a
different word or phrase.

## Links

Source code: https://github.com/TrueDeva/synonym_react

# Deployment Instructions for Synonym App Server

## Introduction

This document outlines the steps required to set up the Synonym App server on a Ubuntu Linux machine. These instructions
assume that you have root access to the machine and that it is already set up with basic server software, such as
Apache2.

## Prerequisites

Before you begin, you should have the following installed on your Ubuntu machine:

- Node.js and npm
- Git

## Procedure

1. Update the package list:

`sudo apt-get update`

2. Install Node.js and npm:

`sudo apt install nodejs npm`

3. Check the Node.js version:

`nodejs --version`

4. You should see a version number displayed, such as

`v14.21.3`.

5. Add the Node.js 14.x repository:

`curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -`

6. Install Node.js again:

`sudo apt-get install -y nodejs`

7. Check the Node.js version again:

`node --version`

8. Navigate to the folder where the project will be placed:

`cd /path/to/folder`

9. Clone the Synonym App project from GitHub:

`git clone https://github.com/TrueDeva/synonym_react.git`

10. Navigate to the project's root folder:

`cd /path/to/folder/synonym_react`

11. Install the project dependencies:

`npm install`

12. Build the project:

`npm run build`

13. Stop the Apache2 server:

`sudo systemctl stop apache2`

14. Install the serve module globally:

`sudo npm install -g serve`

15. Start the serve module to serve the app on port 80:

`serve -s build -l 80`

## Conclusion

After following these steps, the Synonym App should be up and running on your Ubuntu machine. You can access it by
navigating to the IP address or domain name of the server in a web browser.
