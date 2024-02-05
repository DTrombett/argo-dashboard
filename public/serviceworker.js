self.addEventListener(
	"fetch",
	/** @type {EventListener} */ (
		(/** @type {FetchEvent} */ event) => {
			event.respondWith(
				caches.match(event.request).then((cachedResponse) => {
					const networkFetch = fetch(event.request).then((response) => {
						const responseClone = response.clone();

						if (response.status === 200)
							caches
								.open("cache")
								.then((cache) => cache.put(event.request, responseClone))
								.catch(() => {});
						return response;
					});

					return cachedResponse || networkFetch;
				})
			);
		}
	)
);
