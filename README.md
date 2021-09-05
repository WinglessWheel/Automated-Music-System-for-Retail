# Automated Music System for Retail

=================================================

This project is one part of my bachelors assignment.
Copyright (c) 2021 - Torje Markussen

Music Technology @ NTNU, spring 2021.
Prototype built in MAX 7.0.0.

API: https://www.metaweather.com/api/

Implementation of API based on "Amazing Max Stuff": 
https://www.youtube.com/watch?v=Vks-arUZbdA

=================================================

## Example
In this project we're looking at a case of a smaller store open from 09:00 to 21:00. If there are 20 or more customers in the store it is considered "busy", meaning there are a lot of customers.
Under the condition we're calling normal for this store (less than 20 customers) we are playing slow music, increasing the time customers spend in store (dwell time) which should lead to higher gross sales. Under the condition where there are more than 20 customers at one given time we're playing music with a slightly higher tempo to try and make the customers feel like they're spending less time waiting in line. This should affect customers perception of spent time and has been shown to differ from the actual time spent, meaning they feel like they have waited shorter.
Because of licensing, there is no music in the music folders in this example. Feel free to add whatever music you'd like to test the system. 

## How to use
###### Before you start:
-  Add music to the folders marked "music_low, mid, high". The system should automatically start playing music when the patcher is opened, selected automatically based on the current score. 
- There should be multiple files in the folders (>8).
- The project must be saved locally in a folder before and after opening to ensure that the filepath is correct. Otherwise it will look at the previous filepath, which is whoever saved the project last.
###### If it doesn't start playing: 
- Firstly try to restart the patcher a few times. There is a bug that sometimes causes it to not start playback.
- Alternatively you can press the "On/Off"-symbol in the lower right corner of the patch. This is because sometimes the DAC doesn't actually turn on. When you do this, it might just play one song and then stop playing. To get it to work again, press the message box labeled "path" correlated to the folder the patch is supposed to play from. This usually makes it work again.
If this doesn't help: Check the path for the music (in music player) and also check if the score evaluator gives any usable values. Check if the trigger object in the music player is active. 
- In presentation mode the only thing you can do is turning on or off the override and adjusting the volume. The volume should be calibrated upon installation and set as default in message box in the output section. When the override is turned off the volume will automatically be set back to default value.
- The patch reads customers through a document. This is for demonstration purposes. Please see the section on Customer Counter for more information. 

###### If all else fails:
torjemarkussen@gmail.com

## Score evaluator
- Checks if it is a weekday or weekend and checks if the customer number is lower or higher than the high range parameter in customer counter. 
- Can add multiple modules to evaluate. 
- Currently it has a range of 20, 30 and 40, where 20 chooses to slow music, 30 selects medium speed and 40 selects high tempo music. This can be used in various ways depending on the wanted musical output. For example, if the music is categorised by modes, it can select different modes based on the wanted variables.
In this example it works by looking at weekday or weekend. This gives it a score of either 10 or 20. Then it checks the number of customers. If this is lower than the high range (meaning there's a lot of customers for this example store) it will add 10, or if it is above the high range it will give add 20. There is no way in this example that the score goes to 40 (but you can manually if you'd like to test).

## Music player
- Chooses folder based on score from all relevant modules.
- Automatically puts all files in chosen folder into a "umenu"-object. The "umenu"-object gets a value that decides which file to play, this file gets chosen by the urn in the randomizer, which knows the number of items in "umenu" and clears the urn after all files have been played through. This is to ensure no repeat of a song.
- "sfplay~" automatically bangs a message to urn when it is done playing. It then chooses a new number to be played. This bang makes  "sfplay~" play the next file. Lastly this bang also makes the score evaluator check if it should play files from different folder.

## Randomizer for playback
- Basic implementation for randomising of playback. Uses the "urn"-object to not repeat numbers. The number is in the range of the number of items in "umenu" in music player.

## Override
- Turns on or off the in-store override. The previous value of the output section gets stored. When the override is turned off the previous value will be selected for the output. This can be used in situations where the staff of a store needs to change the volume manually.

## Output
- Needs to be calibrated on installation. The message keeps the default value that is banged on load. 
- The DAC is on by default. 
- This section is not to be used as an active volume adjustment.

## Customer counter
- The customer counter is reading a document with twelve lines. Each line represents one hour of the opening hours (currently set to 9 to 21). A real life situation would require an external input fed into the patch which directly changes the current customer number. Since this is to exemplify implementation, use it as an illustration rather than an actual module.
- To change the scenario, please use the "umenu"-object labelled "<-- SCENARIO". Here you can choose different scenarios of numbers to see how to system reacts. 

## Date and time || Weekday calculator
Although this section is the biggest in the code, it is not that complicated. Using a normal programming language this would have been solved in much fewer lines of code. The gist of it is that it uses an algorithm to find out which day of the week it is so it can be used to check wether or not it is a weekday. This is of course not necessary in all stores as the customer flow might not differ much. The algorithm uses "codes" depending on which year, month, century, date and leap year and then modulos with 7 (Year Code + Month Code + Century Code + Date – Leap Year)%7.
Other than this it uses a basic "date"-object to get the time of the day and date.

## Logging
- Writes date and time with the current song to a file with the current date as the filename. Uses a new line and then writes the weather. This module can be used in conjunction with the stores sales and customer counter in order to actually make statistics of how to music is affecting customers and sales.
- See bugs / issues.

## Auto gain
- Uses a microphone input that should be installed in a specific manner: The microphone should be highly directional and placed so that it does not capture the music itself, but the ambient noise in the store. It should also be placed in a strategic position where it will give a "good view" of the whole store, meaning its measurements can be used throughout the store.
- It is then filtered with a downsampling to remove high frequencies, so that high frequency peaks are ignored. Alternatively this can be recorded in 8-bits to save processing power.
- A-weighted scaling into an "average"-object. This should then be scaled so that it can adjust the music volume so that the music is hearable above the ambience, without being to up front.
- This module would probably be better implemented in the output system after the patcher.
- Currently disconnected to avoid issues.
- See bugs / issues.

## Weather report
- Uses an API (https://www.metaweather.com/) to collect weather data which can be logged. 
- Currently it is looking at the weather in Oslo, Norway. This can be changed in the message box starting with "get". 
- The information retrieved is in the form of dictionaries, and is with the Javascript interpreted in a way that is usable.
- Module is based on a video from the channel "Amazing Max Stuff" on YouTube (https://www.youtube.com/watch?v=Vks-arUZbdA).
- Used to display temperature and illustrations of the weather for the user in presentation mode.

## Bugs / issues
- General:
	- Sometimes doesn't start music automatically. Solved by reopening a few times.
		- This might be because the DAC doesn't always turn on when opening patch. Tried to solve this with delayed bang when opening patch.

- Date and time:
	- Sunday represented as "0" (zero), not as 7.

- Music player:
	- Might not play more than one song if you force start it to play.
	- Might repeat last played song when urn is cleared.
	- If you manually stop the playback with toggle it runs through all the files in "umenu". This is because of the implementation of the randomizer, which reacts when you start and stop the playback. If you need to stop the music, use the pause button on the "playbar"-object.
	- Starts playing from the previous selected folder when opening the patch (not the correct folder if the score has changed since last opening).
	- Sometimes crashes, which causes the toggle bug to run.
	- Stops playing after iterating once over all files in current folder.

- Logging:
	- Deletes everything previous in the file if patcher is reopened on same day.

- Auto gain:
	- Not connected.
	- Scaling needs to be adjusted.
	- This module might better be implemented with hardware in the actual speaker system used for playback.

- Weather report:
	- Unable to access image files if not present in the project root.

- GUI/Presentation mode:
	- Changes font if Helvetica isn't on your computer (makes it look kinda off).

###### TO-DO
- [ ] Auto gain: Needs to be connected with output section in a way that automatically adjusts the volume based on room ambience.
- [ ] Customer counter: Add the possibility to have an external input.
- [ ] Logging: Fix bugs.
- [x] Try and figure out why playback doesn't always start when opening patcher.
