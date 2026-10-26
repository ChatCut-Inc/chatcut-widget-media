SELECT e.provider_look_id,
       COALESCE(e.display_name, i.name) AS name,
       e.enabled,
       i.visibility,
       i.owner_id IS NULL AS ownerless,
       r.provider_look_id AS active_look_id,
       r.preview_image_url,
       r.preview_video_url,
       r.capabilities,
       r.status
FROM avatar_catalog_entry e
JOIN avatar_identity i ON i.id = e.identity_id
JOIN avatar_identity_revision r ON r.id = i.active_revision_id
WHERE e.enabled = true
  AND i.visibility = 'public'
  AND i.owner_id IS NULL
  AND i.deleted_at IS NULL
ORDER BY e.sort_order
LIMIT 1000;
