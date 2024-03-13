window.addEventListener("message", function (event) {
    if (event.data.action) {
      var action = event.data.action;
      // Check which action is received and open the corresponding HTML file
      if (action === "RoofRunning") {
        window.location.href = "./RoofRunning/RoofRunning.html?time="+ event.data.time + "&&cols="+event.data.cols+ "&&rows="+event.data.rows;
      } else if (action === "Laundromat") {
        window.location.href = "./Laundromat/Laundromat.html?time="+ event.data.time;
      } else if (action === "RepairKit") {
        window.location.href = "./RepairKit/RepairKit.html?count="+ event.data.count + "&&time="+event.data.time;
      } else if (action === "SmokeCrack") {
        window.location.href = "./SmokeCrack/SmokeCrack.html";
      }
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.location.href = "./index.html";
    }
  });