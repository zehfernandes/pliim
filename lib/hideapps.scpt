# Hide all windows

tell application "System Events"
	set listOfProcesses to (name of every process where visible is true)
	
	# if listOfProcesses contains "Keynote" then tell application "Keynote" to activate
	# if listOfProcesses contains "Sketch" then tell application "Sketch" to activate
	repeat with appName in listOfProcesses
		if {"Sketch", "Keynote"} contains appName then return
		tell application "Finder" to set visible of process appName to false
	end repeat
	
	listOfProcesses
end tell
