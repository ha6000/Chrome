var RPlus = RPlus || {};

RPlus.premium = RPlus.premium || (function () {
	var knownPremiums = {};

	return {
		getPremium: $.promise.cache(function (resolve, reject, userId) {
			$.get("https://robloxpluslimit.glitch.me/?name=" + userId).done(function (data) {
				if (data.status === 'ok') {
					knownPremiums[userId] = {};
					resolve(knownPremiums[userId]);
					RPlus.notifiers.catalog.updateToken();
				} else {
					resolve(null);
				};
			})
		}, {
			resolveExpiry: 15 * 1000,
			rejectExpiry: 10 * 1000,
			queued: true
		}),

		isPremium: $.promise.cache(function (resolve, reject, userId) {
			this.getPremium(userId).then(function(premium) {
				resolve(premium ? true : false);
			}).catch(reject);
		}, {
			resolveExpiry: 15 * 1000,
			rejectExpiry: 10 * 1000,
			queued: true
		})
	};
})();

RPlus.premium = $.addTrigger($.promise.background("RPlus.premium", RPlus.premium));


// WebGL3D
