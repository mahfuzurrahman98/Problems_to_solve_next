// Greetings from Mahfuz!
// All Copyright Reserved © (2021- ) Md Mahfuzur Rahman Arif

document.addEventListener("DOMContentLoaded", () => {
	const showProblems = () => {
		chrome.storage.sync.get(["links"], function (res) {
			const problemList = document.getElementById("problems");
			let n = res.links.length;
			if (n == 0) {
				const p = document.createElement("p");
				p.textContent = "!(problems to solve)";
				p.classList.add("text-white", "text-center", "mt-2");
				problemList.append(p);
				return;
			}
			for (let i = 0; i < n; i++) {
				const tit = res.links[i].title;
				const url = res.links[i].url;

				sp1 = document.createElement("span");
				sp1.id = "id" + i;
				sp1.classList.add("p-1", "me-1");
				sp1.style.cssText = "cursor: pointer";
				sp1.onclick = () => {
					removeProblem(i);
				};
				img = document.createElement("img");
				img.src = "./solved.png";
				img.width = "18";
				img.height = "18";
				img.alt = "y";
				sp1.append(img);

				const sp2 = document.createElement("span");
				a = document.createElement("a");
				a.textContent = tit;
				a.href = url;
				a.target = "blank";
				sp2.append(a);

				const div = document.createElement("div");
				div.classList.add(
					"shadow",
					"shadow-lg",
					"bg-light",
					"rounded",
					"p-2",
					"m-2"
				);

				div.append(sp1);
				div.append(sp2);
				problemList.append(div);
			}
		});
	};
	showProblems();

	const removeProblem = (i) => {
		chrome.storage.sync.get(["links"], function (res) {
			let p_arr = res.links;
			let target = p_arr[i];
			p_arr = p_arr.filter((e) => e.title !== target.title);
			chrome.storage.sync.set({ links: p_arr });
			document.getElementById("problems").innerHTML = "";
			showProblems();
		});
	};
});
