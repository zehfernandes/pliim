# Hide all windows
tell application "System Events" to set activeApp to name of every application process whose frontmost is true
tell application "Finder" to set visible of every process where visible is true and name is not activeApp to false
