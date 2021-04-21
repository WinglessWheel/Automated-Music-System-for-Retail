# Automated Music System for Retail (bachelors assignment)
Prototype for an automatic retail music system.
Built in MAX 7.

Part of my bachelor assignment. 
MUSTEK @ NTNU, spring 2021.

API: https://www.metaweather.com/api/
Implementation of API based on "Amazing Max Stuff" video on youtube (https://www.youtube.com/watch?v=Vks-arUZbdA)

# Bugs / issues
- Music player:
	Might repeat last played song when urn is cleared.
	If you manually stop the playback with toggle it runs through all the files in umenu

- Customer counter:
	Has to read from a file (bad way to implement customers)
- Logging:
	Does not work properly, sometimes won't make new file
	Bugs out on filename.