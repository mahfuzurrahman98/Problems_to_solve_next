const ul = document.getElementById("ul_list");

document.addEventListener("DOMContentLoaded", () => {
	const showProblems = () => {
		chrome.storage.sync.get(["links"], function (res) {
			let n = res.links.length;
			for (let i = 0; i < n; i++) {
				const problemList = document.getElementById("problems");
				const div = document.createElement("div");

				const tit = res.links[i].title;
				const url = res.links[i].url;

				div.classList.add(
					"shadow",
					"shadow-lg",
					"bg-light",
					"rounded",
					"p-2",
					"m-2"
				);
				div.innerHTML = `
					<span class="p-1 me-1" id="p${i}" style="cursor: pointer" onclick="removeProblem(${i})">
						<img src="./solved.png" width="18" height="18" alt="solved">
					</span>
					<span>
						<a href="${url}" target="blank">${tit}</a>
					</span>
				`;

				problemList.append(div);
			}
		});
	};
	showProblems();

	const removeProblem = (i) => {
		chrome.storage.sync.get(["links"], function (res) {
			let p_arr = res.links;
			let target = p_arr[i];
			p_arr = p_arr.filter((e) => e.title !== target);
			chrome.storage.sync.set({ links: p_arr });
			showProblems();
		});
	};
});
