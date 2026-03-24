// Role-based permission system
// Each role defines what actions a user can take in the admin panel.

export const ROLES = {
  admin: {
    label: "Admin",
    description: "Full access — manage users, settings, pages, and content.",
    permissions: [
      "manage_users",
      "manage_roles",
      "manage_settings",
      "manage_pages",
      "create_pages",
      "delete_pages",
      "edit_content",
      "manage_sections",
      "add_sections",
      "remove_sections",
      "reorder_sections",
      "manage_navigation",
      "manage_news",
      "view_analytics",
      "manage_media",
      "export_data",
      "manage_forms",
      "edit_code",
      "manage_custom_css",
    ],
  },
  developer: {
    label: "Developer",
    description: "Technical access — pages, sections, custom code, media.",
    permissions: [
      "manage_pages",
      "create_pages",
      "delete_pages",
      "edit_content",
      "manage_sections",
      "add_sections",
      "remove_sections",
      "reorder_sections",
      "manage_navigation",
      "manage_news",
      "manage_media",
      "manage_forms",
      "edit_code",
      "manage_custom_css",
    ],
  },
  marketing: {
    label: "Marketing",
    description: "Content access — edit text, images, and news. No coding required.",
    permissions: [
      "edit_content",
      "manage_news",
      "manage_media",
      "manage_forms",
    ],
  },
};

export const DEFAULT_USERS = [
  { id: "admin-1", username: "admin", password: "admin", role: "admin", name: "Admin User" },
  { id: "dev-1", username: "dev", password: "dev123", role: "developer", name: "Developer" },
  { id: "mkt-1", username: "marketing", password: "mkt123", role: "marketing", name: "Marketing Team" },
];

export function hasPermission(role, permission) {
  const r = ROLES[role];
  if (!r) return false;
  return r.permissions.includes(permission);
}
