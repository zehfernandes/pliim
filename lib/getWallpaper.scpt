tell application "System Events"
	set theList to {}
	repeat with current_desktop in desktops
		set picPath to picture of current_desktop as string
		tell application "Finder" to set end of theList to picPath
	end repeat

	return theList
end tell
