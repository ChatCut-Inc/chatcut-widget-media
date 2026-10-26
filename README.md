# ChatCut Widget Media

Public preview-only media for ChatCut Claude widget cards.

This repository intentionally contains only public catalog thumbnails, compact
official-avatar previews, short voice audition samples, and scenario preview
images. Do not add user or project media.

Published layout:

- `widget-media/design-styles/<presetId>.jpg`
- `widget-media/avatars/<mediaKey>/poster.jpg`
- `widget-media/avatars/<mediaKey>/preview.mp4`
- `widget-media/voice-samples/<provider>-<voiceId>.mp3`
- `widget-media/scenarios/<name>.jpg`

Use immutable jsDelivr URLs, for example:

`https://cdn.jsdelivr.net/gh/ChatCut-Inc/chatcut-widget-media@56567972db8342367bfbcceb73392c641fbb04a0/widget-media/voice-samples/doubao-vivi.mp3`

Avatar media keys are opaque public-repository keys, not ChatCut identity IDs.
The backend maps stable provider look IDs to these keys because identity IDs can
differ across dev, beta, and production.

## Full public avatar coverage

`avatar-catalog.json` records the stable look-to-media mapping for all 58 enabled
public avatars verified in production on 2026-10-26. All have a poster; 57 also
have a short video. Jibran has no source video and uses its real poster only.
New clips are at most six seconds, H.264/yuv420p with AAC when audio exists,
and at most 480 pixels on the longest side. Original sources and signed URLs
are not committed.

Before enabling another public catalog entry, prepare its preview assets and
publish the updated mapping with them. Export the **complete** public catalog
using `scripts/public-avatar-catalog.sql` through ChatCut's read-only data-query
tool, saving the JSON outside this repository. Then run:

```sh
node scripts/check-avatar-catalog.mjs /absolute/path/public-catalog.json
```

The check fails for an incomplete export, any private/disabled identity, missing
look mappings, or missing files. Running without an export verifies only the
checked-in files, not current live-catalog coverage. Do not limit the export to
the first recommendation page. After publishing, pin the immutable asset commit
and copy this mapping into ChatCut's backend; verify all resulting CDN URLs.
This check is a publication gate, not automatic synchronization from the admin
catalog. Adding an identity in admin alone does not publish its Claude preview.
