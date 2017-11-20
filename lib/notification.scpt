# Disable Notifications
set tDate to do shell script "date -u \"+%Y-%m-%dT%TZ\"" --  the current date in UTC time. --> "2016-04-04T17:03:04Z"
do shell script "defaults -currentHost write com.apple.notificationcenterui doNotDisturb -bool TRUE; defaults -currentHost write com.apple.notificationcenterui doNotDisturbDate -date " & tDate & "; osascript -e 'quit application \"NotificationCenter\" ' && killall usernoted" --this  set 'Do not disturb'  to true in the pref
