
# TN MINIGAME

NOPIXEL 4.0 Inspired minigames

## Installation
drag and drop

## Useage 

### Laundromat
    exports['TN-minigame']:Laundromat(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 30) -- Hack Time Limit


### RepairKit
    exports['TN-minigame']:RepairKit(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 5, 30) -- count, time (speed)

### RoofRunning
    exports['TN-minigame']:RoofRunning(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 25, 11, 8) -- time, cols, rows

### SmokeCrack
    exports['TN-minigame']:SmokeCrack(function(data)
        if data.success then
            print("success")
            print(data.diff) -- easy / medium / hard
		else
			print("fail")
            print(data.diff)
		end
    end) -- Hack Time Limit

