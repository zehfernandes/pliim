# Turn on Notifications
do shell script "defaults -currentHost write com.apple.notificationcenterui doNotDisturb -bool FALSE; defaults -currentHost delete com.apple.notificationcenterui doNotDisturbDate; osascript -e 'quit application \"NotificationCenter\" ' && killall usernoted" -- this set  'Do not disturb' to false in the pref

# Show Desktop
do shell script "defaults write com.apple.finder CreateDesktop -bool true; killall Finder"

# Show all windows
tell application "System Events"
	set visible of (every process) to true
end tell