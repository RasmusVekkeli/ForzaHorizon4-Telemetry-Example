# Description
This repo contains example code for reading the telemetry data from Forza Horizon 4 using the game's Data Out feature. This code may work for Forza Motorsports 7, though that is untested.

## Setup
First we need to enable localhost loopback for the game, since in UWP applications restrict sending data to localhost by default. [Source](https://forums.forzamotorsport.net/turn10_postsm994745_Forza-Motorsport-7--Data-Out--feature-details.aspx#post_994745)

This step can be skipped if you want to send data to an external machine instead.

Run the following in command prompt while logged in as admin:

For Forza Horizon 4:

	CheckNetIsolation.exe LoopBackExempt -a -n="microsoft.sunrisebasegame_8wekyb3d8bbwe"

For Forza Motorsports 7:

	CheckNetIsolation.exe LoopbackExempt -a -n="microsoft.apollobasegame_8wekyb3d8bbwe"

Next go to the in game settings -> Hud and Gameplay and set your Data Out settings as follows:

	Data Out: On
	Data Out IP Address: 127.0.0.1 (can be any IP address obviously)
	Data Out Port: 60022 (can be any port, but the script uses this by default)

Now run simply run the `main.js` script with Node. You should start seeing values printed to the console as soon as you start driving.