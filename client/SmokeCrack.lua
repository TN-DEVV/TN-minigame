local p = nil

local function SmokeCrack(cb, count, time)
    if count == nil or count < 1 then count = 1 end
    if time == nil or time < 20 then time = 20 end
    p = promise.new()
    SendNUIMessage({
        action = 'SmokeCrack',
    })
    SetNuiFocus(true, true)
    local result = Citizen.Await(p)
    cb(result)
end
exports("SmokeCrack", SmokeCrack)

RegisterNUICallback('smokeresult', function(data, cb)
    p:resolve(data)
    p = nil
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterCommand("SmokeCrack", function(source, args)
    exports['TN-minigame']:SmokeCrack(function(data)
        if data.success then
            print("success")
            print(data.diff)
		else
			print("fail")
            print(data.diff)
		end
    end) -- Hack Time Limit
end, false)

RegisterNUICallback('closesmoke', function()
    SetNuiFocus(false, false)
end)