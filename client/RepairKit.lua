local p = nil

local function RepairKit(cb, count, time)
    if count == nil or count < 1 then count = 1 end
    if time == nil or time < 20 then time = 20 end
    p = promise.new()
    SendNUIMessage({
        action = 'RepairKit',
        count = count,
        time = time,
    })
    SetNuiFocus(true, true)
    local result = Citizen.Await(p)
    cb(result)
end
exports("RepairKit", RepairKit)

RegisterNUICallback('repairresult', function(data, cb)
    p:resolve(data)
    p = nil
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterCommand("RepairKit", function(source, args)
    exports['TN-minigame']:RepairKit(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 5, 30) -- Hack Time Limit
end, false)