# Automated Music System for Retail (bachelors assignment)
Prototype for an automatic retail music system.
Built in MAX 7.0.0.

Part of my bachelor assignment. 
Music Technology @ NTNU, spring 2021.

API: https://www.metaweather.com/api/
Implementation of API based on "Amazing Max Stuff" video on youtube (https://www.youtube.com/watch?v=Vks-arUZbdA)

Disclaimer: The music provided is not relevant to any actual setting, and is solely for the purpose of testing. I do not own the licenses to use this music. Please use your own music for demonstration and testing purposes.

# How to use
This system should automatically start playing music from an automatically chosen folder. If it doesn't check the folderpath for the music (in music player) and also check if the score evaluator gives any usable values. Lastly, check if the trigger object in the music player is active.
In presentation mode the only thing that a person is able to change is by turning on the override and adjusting the volume. However, the volume should be calibrated upon installation and set as default in message box in output section. When the override is turned off the volume will automatically be set back to default value.

# Music player
- Chooses folder based on score from all relevant modules.
- Automatically puts all files in chosen folder into a umenu.
The umenu gets a value that decides which file to play, this file gets chosen by the urn, which knows the number of items in umenu and clears the urn after all files have been played through. This is to ensure no repeat of a song.
- sfplay automatically bangs a message to urn when it is done playing so that it chooses a new number to be played.
- same bang makes the sfplay play the next file.
- bang also makes the score evaluator check if it should play files from different folder
- The bang that bangs when done playing file also triggers 

# Bugs / issues
- Music player:
	Might repeat last played song when urn is cleared.
	If you manually stop the playback with toggle it runs through all the files in umenu. This is because of the implementation of the randomizer, which reacts when you start and stop the playback. If you need to stop the music, use the pause button on the playbar object.
- Customer counter:
	Has to read from a file (bad way to implement customers)
- Logging:
	First file after opening outputs without date (day).
	Deletes everything previous in logfile if program is reopened on same day.
- Auto gain:
	Not connected. 
- Weather report:
	Unable to access files if not present in the project root.

# TO-DO
Auto gain: Needs to be connected with output section in a way that automatically adjusts the volume based on room ambience.
