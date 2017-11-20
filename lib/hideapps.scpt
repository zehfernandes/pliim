# Hide all windows
tell application "System Events"
    set visible of every process whose visible is true and name is not "Sketch" to false
    set the collapsed of windows to true
end tell