chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ links: [] });
	console.log("Hello from background");
	const ojs = [
		"*://*.codeforces.com/*",
		"*://*.codechef.com/*",
		"*://onlinejudge.org/*",
		"*://*.spoj.com/*",
		"*://lightoj.com/*",
		"*://atcoder.jp/*",
		"*://csacademy.com/*",
		"*://*.hackerrank.com/*",
		"*://*.hackerearth.com/*",
		"*://leetcode.com/*",
		"*://vjudge.net/*",
		"*://*.devskill.com/*",
		"*://open.kattis.com/*",
		"*://poj.org/*",
		"*://acm.timus.ru/*",
		"*://icpcarchive.ecs.baylor.edu/*",
		"*://toph.co/*",
		"*://algo.codemarshal.org/*",
		"*://*.beecrowd.com.br/judge/*",
		"*://practice.geeksforgeeks.org/*",
	];
	let contextMenu = {
		id: "ext",
		title: "< Solve / later >",
		contexts: ["page"],
		documentUrlPatterns: ojs,
	};
	chrome.contextMenus.create(contextMenu);
});

chrome.contextMenus.onClicked.addListener(() => {
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true,
		},
		(tabs) => {
			const title = tabs[0].title;
			const url = tabs[0].url;
			console.log(title);

			chrome.storage.sync.get(["links"], function (res) {
				let links_arr = res.links;
				// console.log(links_arr);
				if (links_arr.length == 0) {
					links_arr.push({ title: title, url: url });
				} else {
					const indx = links_arr.findIndex((item) => item.title === title);
					if (indx == -1) {
						links_arr.push({ title: title, url: url });
					} else {
						console.log("ache");
					}
				}
				chrome.storage.sync.set({ links: links_arr });
			});
		}
	);
});
