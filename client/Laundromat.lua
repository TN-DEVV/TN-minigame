local p = nil

local function Laundromat(cb, timing)
    if timing == nil or timing < 5 then timing = 5 end
    p = promise.new()
    SendNUIMessage({
        action = 'Laundromat',
        time = timing,
    })
    SetNuiFocus(true, true)
    local result = Citizen.Await(p)
    cb(result)
end
exports("Laundromat", Laundromat)

RegisterNUICallback('result', function(data, cb)
    p:resolve(data)
    p = nil
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
end)

RegisterCommand("Laundromat", function(source, args)
    exports['TN-minigame']:Laundromat(function(success)
        if success then
            print("success")
		else
			print("fail")
		end
    end, 30) -- Hack Time Limit
end, false)