local p = nil

local function RoofRunning(cb, time, cols, rows)
    if time == nil or time < 20 then time = 20 end
    if cols == nil or cols < 5 then cols = 5 end
    if rows == nil or rows < 5 then rows = 5 end
    p = promise.new()
    SendNUIMessage({
        action = 'RoofRunning',
        time = time,
        cols = cols,
        rows = rows,
    })
    SetNuiFocus(true, true)
    local result = Citizen.Await(p)
    cb(result)
end
exports("RoofRunning", RoofRunning)

RegisterNUICallback('roofresult', function(data, cb)
    p:resolve(data)
    p = nil
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterCommand("RoofRunning", function(source, args)
    exports['TN-minigame']:RoofRunning(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 40, 7, 7) -- Hack Time Limit
end, false)