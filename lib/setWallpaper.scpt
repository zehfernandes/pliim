tell application "System Events"
	set theCount to 1
	repeat with current_desktop in desktops
		set picture of current_desktop to item theCount of theList
		set theCount to theCount + 1
	end repeat
end tell
