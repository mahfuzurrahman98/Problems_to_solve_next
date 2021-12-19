const ul = document.getElementById("ul_list");

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("clr").addEventListener("click", () => {
		document.getElementById(
			"main"
		).innerHTML = `<p style="color:red;font-size:1rem;">All_the_links_are_cleared</p>`;
		chrome.storage.sync.set({ links: ["No_links_are_stored"] });
	});

	chrome.storage.sync.get(["links"], function (res) {
		if (!res.links) {
			document.getElementById(
				"main"
			).innerHTML = `<p style="color:red;font-size:1rem">No_links_are_stored</p>`;
			chrome.storage.sync.set({ links: ["No_links_are_stored"] });
		} else {
			let n = res.links.length;
			if (n == 1) {
				document.getElementById(
					"main"
				).innerHTML = `<p style="color:red;font-size:1rem">No_links_are_stored</p>`;
				chrome.storage.sync.set({ links: ["No_links_are_stored"] });
			} else {
				document.getElementById("clr").classList.remove("d-none");
				printDash = false;
				for (let i = 1; i < n; i++) {
					const e = res.links[i];
					const li = document.createElement("li");
					const sp = document.createElement("div");

					if ((i - 1) % 10 == 0) {
						if (printDash) {
							sp.style.color = "orange";
							sp.innerHTML = "----------------------------------";
							ul.append(sp);
						}
						printDash = true;
					}

					li.textContent = e;
					ul.append(li);
				}
			}
		}
	});
});
