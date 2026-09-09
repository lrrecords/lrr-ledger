// Public read-only ledger endpoint for client-facing share links.
// Deliberately exposes only what a client should see: name, budget, and
// a stripped-down entries list (song, label, cost, date). No ids, no
// contact info, no other clients, and no write access of any kind.
routerAdd("GET", "/api/ledger-view/{slug}", (e) => {
  const slug = e.request.pathValue("slug")

  let client
  try {
    client = $app.findFirstRecordByFilter("clients", "slug = {:slug}", { slug: slug })
  } catch (err) {
    throw new NotFoundError("Ledger not found")
  }

  const records = $app.findRecordsByFilter(
    "work_entries",
    "client = {:clientId}",
    "sort_order,date",
    500,
    0,
    { clientId: client.id }
  )

  const entries = records.map((r) => ({
    song: r.get("song"),
    label: r.get("label"),
    cost: r.get("cost"),
    date: r.get("date")
  }))

  return e.json(200, {
    name: client.get("name"),
    budget: client.get("budget"),
    entries: entries
  })
})
