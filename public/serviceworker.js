/**
 * @param {Request} request
 * @param {Response} response
 */
const putIntoCache = async (request, response) => {
	const cache = await caches.open("cache");

	cache.put(request, response);
};

/**
 *
 * @param {Request} request
 */
const makeRequest = async (request) => {
	const response = await fetch(request);

	if (response.ok) putIntoCache(request, response.clone()).catch(console.error);
	return response;
};

/**
 * @param {Request} request
 */
const handleCache = async (request) => {
	const cached = await caches.match(request);
	const cachedDate = cached?.headers.get("date");

	if (
		cached &&
		cachedDate &&
		Date.now() < Date.parse(cachedDate) + 1_000 * 60 * 10
	)
		return cached;
	const newResponse = makeRequest(request).catch(Response.error);

	return cached || newResponse;
};

self.addEventListener(
	"fetch",
	/** @type {EventListener} */ (
		(/** @type {FetchEvent} */ event) => {
			if (
				event.request.method === "GET" &&
				event.request.url.startsWith("https://")
			)
				event.respondWith(handleCache(event.request));
		}
	)
);
