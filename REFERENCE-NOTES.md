# Reference Notes — v3 build

Per build prompt v3 §0: before writing any code, this build attempted to
visit the three reference sites directly.

## Result: all three domains are network-egress-blocked in this session

```
WebFetch https://drinkag1.com  -> EGRESS_BLOCKED: "Access to drinkag1.com
  is blocked by the network egress proxy."
WebFetch https://bloomnu.com   -> EGRESS_BLOCKED: "Access to bloomnu.com
  is blocked by the network egress proxy."
WebFetch https://gruns.co      -> EGRESS_BLOCKED: "Access to gruns.co is
  blocked by the network egress proxy."
```

This matches the build prompt's own stated caveat in §0 — the authoring
session hit the same block. Per the prompt's explicit instruction for this
case: **no values below are sampled from the live sites.** Every hex code,
type pairing, section order, and component description used in this build
is taken directly and only from the documented specs in §6b–§9 of the
build prompt (`Prompt-For-Landing-Pages` branch, `README.md`). None of it
is presented as verified against the live pages, and no correction entries
were made because no live observation was possible.

If network access becomes available in a future session, re-run this
check, fetch all three URLs, and update this file with real sampled hex
values, computed font stacks, section-by-section headings, and any
divergence from the current `DESIGN.md` token tables — noting per the
prompt's rule that live observations win over the documented spec.

## What was built instead

Three templates built strictly from build prompt v3 §7 (`01-ag1`), §8
(`02-bloom`), and §9 (`03-gruns`), including the differentiation matrix in
§6b, with no reinterpretation and no invented section content beyond what
each spec calls for.
