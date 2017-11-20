# Hide all windows
tell application "System Events"
	set visible of every process whose visible is true and background only is false and name is not "Sketch" to false
end tell
