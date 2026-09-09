// Explicitly serve static files from pb_public.
// (Some PocketBase builds/configs don't auto-serve pb_public without this.)
routerAdd("GET", "/{path...}", $apis.static("./pb_public", true))
