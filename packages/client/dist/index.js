// src/api.ts
import axios from "axios";
import qs from "query-string";
import debugFactory from "debug";
var debug = debugFactory("axios");
var APISUFFIX = "/++api++";
function getBackendURL(apiPath, apiSuffix, path) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const adjustedPath = path[0] !== "/" ? `/${path}` : path;
  return `${apiPath}${apiSuffix ?? APISUFFIX}${adjustedPath}`;
}
var _handleResponse = (response) => response;
var _handleError = (config) => (error) => {
  debug(error);
  const status = error.status ?? 0;
  return Promise.reject({
    status: error.status ?? error.code,
    data: error.response?.data,
    location: status >= 300 && status < 400 ? error.response?.headers.location.replaceAll(
      `${config.apiPath}${config.apiSuffix ?? APISUFFIX}`,
      ""
    ).replace(/\?.*$/, "") : void 0
  });
};
function axiosConfigAdapter(method, path, options) {
  const {
    config,
    params,
    data,
    maxRedirects,
    headers = {}
  } = options;
  const axiosConfig = {
    method,
    url: getBackendURL(config.apiPath, config.apiSuffix, path),
    params,
    headers: {
      Accept: "application/json",
      ...headers
    },
    data,
    validateStatus: function(status) {
      return status >= 200 && status < 300;
    },
    paramsSerializer: function(params2) {
      return qs.stringify(params2, { arrayFormat: "colon-list-separator" });
    },
    maxRedirects
  };
  if (config.token && axiosConfig.headers) {
    axiosConfig.headers["Authorization"] = `Bearer ${config.token}`;
  }
  debug(axiosConfig);
  return axiosConfig;
}
async function apiRequest(method, path, options) {
  const instance = axios.create();
  if (options.raw) {
    instance.interceptors.response.use(void 0, _handleError(options.config));
  } else {
    instance.interceptors.response.use(
      _handleResponse,
      _handleError(options.config)
    );
  }
  return instance.request(axiosConfigAdapter(method, path, options));
}

// src/restapi/actions/get.ts
import { z } from "zod";
var getActionsSchema = z.object({
  path: z.string()
});
async function getActions({ path }) {
  const validatedArgs = getActionsSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const actionsPath = `${validatedArgs.path}/@actions`;
  return apiRequest("get", actionsPath, options);
}

// src/restapi/addons/get_list.ts
async function getAddons() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@addons", options);
}

// src/restapi/addons/get.ts
import { z as z2 } from "zod";
var getAddonSchema = z2.object({
  id: z2.string()
});
async function getAddon({ id }) {
  const validatedArgs = getAddonSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const addonName = `@addons/${validatedArgs.id}`;
  return apiRequest("get", addonName, options);
}

// src/restapi/addons/install.ts
import { z as z3 } from "zod";
var installAddonSchema = z3.object({
  id: z3.string()
});
async function installAddon({ id }) {
  const validatedArgs = installAddonSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const addonName = `@addons/${validatedArgs.id}/install`;
  return apiRequest("post", addonName, options);
}

// src/restapi/addons/uninstall.ts
import { z as z4 } from "zod";
var uninstallAddonSchema = z4.object({
  id: z4.string()
});
async function uninstallAddon({ id }) {
  const validatedArgs = uninstallAddonSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const addonName = `@addons/${validatedArgs.id}/uninstall`;
  return apiRequest("post", addonName, options);
}

// src/restapi/addons/upgrade.ts
import { z as z5 } from "zod";
var upgradeAddonSchema = z5.object({
  id: z5.string()
});
async function upgradeAddon({ id }) {
  const validatedArgs = upgradeAddonSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const addonName = `@addons/${validatedArgs.id}/upgrade`;
  return apiRequest("post", addonName, options);
}

// src/restapi/addons/install_profile.ts
import { z as z6 } from "zod";
var installAddonProfileSchema = z6.object({
  id: z6.string(),
  profile: z6.string()
});
async function installAddonProfile({ id, profile }) {
  const validatedArgs = installAddonProfileSchema.parse({
    id,
    profile
  });
  const options = {
    config: this.config,
    params: {}
  };
  const addonName = `@addons/${validatedArgs.id}/${profile}`;
  return apiRequest("post", addonName, options);
}

// src/restapi/aliases/get_all.ts
async function getAllAliases() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@aliases", options);
}

// src/restapi/aliases/get.ts
import { z as z7 } from "zod";
var getAliasesSchema = z7.object({
  path: z7.string()
});
async function getAliases({ path }) {
  const validatedArgs = getAliasesSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const aliasesPath = `${validatedArgs.path}/@aliases`;
  return apiRequest("get", aliasesPath, options);
}

// src/restapi/aliases/create.ts
import { z as z9 } from "zod";

// src/validation/aliases.ts
import { z as z8 } from "zod";
var itemSchema = z8.object({
  path: z8.string()
});
var createAliasDataSchema = z8.object({
  items: z8.array(itemSchema)
});
var deleteAliasesDataSchema = z8.object({
  items: z8.array(itemSchema)
});
var rootItemSchema = z8.object({
  datetime: z8.string().optional(),
  path: z8.string(),
  "redirect-to": z8.string()
});
var createAliasesDataSchema = z8.object({
  items: z8.array(rootItemSchema)
});

// src/restapi/aliases/create.ts
var createAliasArgsSchema = z9.object({
  path: z9.string(),
  data: createAliasDataSchema
});
async function createAlias({ path, data }) {
  const validatedArgs = createAliasArgsSchema.parse({
    path,
    data
  });
  const addAliasPath = `${validatedArgs.path}/@aliases`;
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", addAliasPath, options);
}

// src/restapi/aliases/create_multiple.ts
import { z as z10 } from "zod";
var createAliasesArgsSchema = z10.object({
  data: createAliasesDataSchema
});
async function createAliases({ data }) {
  const validatedArgs = createAliasesArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@aliases", options);
}

// src/restapi/aliases/delete.ts
import { z as z11 } from "zod";
var deleteAliasesArgsSchema = z11.object({
  path: z11.string(),
  data: deleteAliasesDataSchema
});
async function deleteAliases({ path, data }) {
  const validatedArgs = deleteAliasesArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const aliasesPath = `${validatedArgs.path}/@aliases`;
  return apiRequest("delete", aliasesPath, options);
}

// src/restapi/breadcrumbs/get.ts
import { z as z12 } from "zod";
var getBreadcrumbsSchema = z12.object({
  path: z12.string()
});
async function getBreadcrumbs({ path }) {
  const validatedArgs = getBreadcrumbsSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const breadcrumbsPath = `${validatedArgs.path}/@breadcrumbs`;
  return apiRequest("get", breadcrumbsPath, options);
}

// src/restapi/comments/get.ts
import { z as z13 } from "zod";
var getCommentsSchema = z13.object({
  path: z13.string()
});
async function getComments({ path }) {
  const validatedArgs = getCommentsSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const commentsPath = `/${validatedArgs.path}/@comments`;
  return apiRequest("get", commentsPath, options);
}

// src/restapi/comments/create.ts
import { z as z15 } from "zod";

// src/validation/comments.ts
import { z as z14 } from "zod";
var createCommentDataSchema = z14.object({
  text: z14.string()
});

// src/restapi/comments/create.ts
var createCommentArgsSchema = z15.object({
  path: z15.string(),
  in_reply_to: z15.string().optional(),
  data: createCommentDataSchema
});
async function createComment({ path, in_reply_to, data }) {
  const validatedArgs = createCommentArgsSchema.parse({
    path,
    in_reply_to,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const commentsPath = in_reply_to ? `/${validatedArgs.path}/@comments/${validatedArgs.in_reply_to}` : `/${validatedArgs.path}/@comments`;
  return apiRequest("post", commentsPath, options);
}

// src/restapi/comments/update.ts
import { z as z16 } from "zod";
var updateCommentArgsSchema = z16.object({
  path: z16.string(),
  comment_id: z16.string(),
  data: createCommentDataSchema
});
async function updateComment({ path, comment_id, data }) {
  const validatedArgs = updateCommentArgsSchema.parse({
    path,
    comment_id,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;
  return apiRequest("patch", commentsPath, options);
}

// src/restapi/comments/delete.ts
import { z as z17 } from "zod";
var deleteCommentArgsSchema = z17.object({
  path: z17.string(),
  comment_id: z17.string()
});
async function deleteComment({ path, comment_id }) {
  const validatedArgs = deleteCommentArgsSchema.parse({
    path,
    comment_id
  });
  const options = {
    config: this.config
  };
  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;
  return apiRequest("delete", commentsPath, options);
}

// src/restapi/content/get.ts
import { z as z18 } from "zod";
var getContentArgsSchema = z18.object({
  path: z18.string(),
  version: z18.string().optional(),
  page: z18.number().optional(),
  fullObjects: z18.boolean().optional(),
  expand: z18.string().array().optional()
});
async function getContent({ path, version, page, fullObjects, expand }) {
  const validatedArgs = getContentArgsSchema.parse({
    path,
    version,
    page,
    fullObjects,
    expand
  });
  const options = {
    config: this.config,
    maxRedirects: 0,
    params: {
      ...validatedArgs.page && { page: validatedArgs.page },
      ...validatedArgs.version && { version: validatedArgs.version },
      ...validatedArgs.fullObjects && {
        fullobjects: validatedArgs.fullObjects
      }
    }
  };
  if (validatedArgs.version) {
    return apiRequest(
      "get",
      `${path}/@history/${validatedArgs.version}`,
      options
    );
  }
  if (validatedArgs.expand) {
    options.params = {
      ...options.params,
      expand
    };
  }
  return apiRequest("get", path, options);
}

// src/restapi/content/create.ts
import { z as z20 } from "zod";

// src/validation/content.ts
import { z as z19 } from "zod";
var RelatedItemPayloadSchema = z19.object({
  "@id": z19.string(),
  "@type": z19.string(),
  CreationDate: z19.string(),
  Creator: z19.string(),
  Date: z19.string(),
  Description: z19.string(),
  EffectiveDate: z19.unknown(),
  ExpirationDate: z19.unknown(),
  ModificationDate: z19.string(),
  Subject: z19.array(z19.unknown()),
  Title: z19.string(),
  Type: z19.string(),
  UID: z19.string(),
  author_name: z19.unknown(),
  cmf_uid: z19.unknown(),
  commentators: z19.array(z19.unknown()),
  created: z19.string(),
  description: z19.string(),
  effective: z19.string(),
  end: z19.unknown(),
  exclude_from_nav: z19.boolean(),
  expires: z19.string(),
  getIcon: z19.unknown(),
  getId: z19.string(),
  getObjSize: z19.string(),
  getPath: z19.string(),
  getRemoteUrl: z19.unknown(),
  getURL: z19.string(),
  hasPreviewImage: z19.unknown(),
  head_title: z19.unknown(),
  id: z19.string(),
  image_field: z19.string().nullable(),
  image_scales: z19.unknown(),
  in_response_to: z19.unknown(),
  is_folderish: z19.boolean(),
  last_comment_date: z19.unknown(),
  listCreators: z19.array(z19.string()),
  location: z19.unknown(),
  mime_type: z19.string(),
  modified: z19.string(),
  nav_title: z19.unknown(),
  portal_type: z19.string(),
  review_state: z19.string(),
  start: z19.unknown(),
  sync_uid: z19.unknown(),
  title: z19.string(),
  total_comments: z19.number()
}).partial().required({
  "@id": true,
  title: true
});
var createContentDataSchema = z19.object({
  "@id": z19.string().optional(),
  "@static_behaviors": z19.unknown().optional(),
  "@type": z19.string(),
  allow_discussion: z19.boolean().optional(),
  blocks: z19.unknown().optional(),
  blocks_layout: z19.object({ items: z19.array(z19.string()) }).optional(),
  contributors: z19.array(z19.string()).optional(),
  creators: z19.array(z19.string()).optional(),
  description: z19.string().optional(),
  effective: z19.string().nullable().optional(),
  exclude_from_nav: z19.boolean().optional(),
  expires: z19.string().nullable().optional(),
  file: z19.object({
    "content-type": z19.string(),
    data: z19.string(),
    encoding: z19.string(),
    filename: z19.string()
  }).optional(),
  id: z19.string().optional(),
  image: z19.object({
    "content-type": z19.string(),
    data: z19.string(),
    encoding: z19.string(),
    filename: z19.string()
  }).optional(),
  language: z19.string().optional(),
  preview_caption: z19.string().optional(),
  preview_image: z19.object({
    "content-type": z19.string(),
    data: z19.string(),
    encoding: z19.string(),
    filename: z19.string()
  }).optional(),
  relatedItems: z19.array(RelatedItemPayloadSchema).optional(),
  rights: z19.string().nullable().optional(),
  title: z19.string(),
  versioning_enabled: z19.boolean().optional()
});
var updateContentDataSchema = z19.object({
  allow_discussion: z19.boolean().optional(),
  blocks: z19.unknown().optional(),
  blocks_layout: z19.object({ items: z19.array(z19.string()) }).optional(),
  contributors: z19.array(z19.string()).optional(),
  creators: z19.array(z19.string()).optional(),
  description: z19.string().optional(),
  effective: z19.string().nullable().optional(),
  exclude_from_nav: z19.boolean().optional(),
  expires: z19.string().nullable().optional(),
  id: z19.string().nullable().optional(),
  ordering: z19.object({
    obj_id: z19.string(),
    delta: z19.union([z19.number(), z19.literal("bottom"), z19.literal("top")]),
    subset_ids: z19.array(z19.string()).optional()
  }).optional(),
  preview_caption: z19.string().nullable().optional(),
  preview_image: z19.object({
    "content-type": z19.string(),
    data: z19.string(),
    encoding: z19.string(),
    filename: z19.string()
  }).nullable().optional(),
  relatedItems: z19.array(RelatedItemPayloadSchema).optional(),
  rights: z19.string().nullable().optional(),
  table_of_contents: z19.boolean().nullable().optional(),
  title: z19.string().optional(),
  versioning_enabled: z19.boolean().optional()
}).partial();
var copyMoveContentDataSchema = z19.object({
  path: z19.string(),
  data: z19.object({
    source: z19.union([z19.string(), z19.array(z19.string())])
  })
});

// src/restapi/content/create.ts
var createContentArgsSchema = z20.object({
  path: z20.string(),
  data: createContentDataSchema
});
async function createContent({ path, data }) {
  const validatedArgs = createContentArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", validatedArgs.path, options);
}

// src/restapi/content/update.ts
import { z as z21 } from "zod";
var updateContentArgsSchema = z21.object({
  path: z21.string(),
  data: updateContentDataSchema
});
async function updateContent({ path, data }) {
  const validatedArgs = updateContentArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("patch", validatedArgs.path, options);
}

// src/restapi/content/delete.ts
import { z as z22 } from "zod";
var deleteContentArgsSchema = z22.object({
  path: z22.string()
});
async function deleteContent({ path }) {
  const validatedArgs = deleteContentArgsSchema.parse({
    path
  });
  const options = {
    config: this.config
  };
  return apiRequest("delete", validatedArgs.path, options);
}

// src/restapi/content/copy.ts
import "zod";
async function copyContent({ path, data }) {
  const validatedArgs = copyMoveContentDataSchema.parse({
    path,
    data
  });
  const options = {
    config: this.config,
    data: validatedArgs.data
  };
  const copyPath = `${validatedArgs.path}/@copy`;
  return apiRequest("post", copyPath, options);
}

// src/restapi/content/move.ts
import "zod";
async function moveContent({ path, data }) {
  const validatedArgs = copyMoveContentDataSchema.parse({
    path,
    data
  });
  const options = {
    config: this.config,
    data: validatedArgs.data
  };
  const movePath = `${validatedArgs.path}/@move`;
  return apiRequest("post", movePath, options);
}

// src/restapi/contextnavigation/get.ts
import { z as z25 } from "zod";
var getContextNavigationSchema = z25.object({
  path: z25.string()
});
async function getContextNavigation({ path }) {
  const validatedArgs = getContextNavigationSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const contextnavigationPath = `${validatedArgs.path}/@contextnavigation`;
  return apiRequest("get", contextnavigationPath, options);
}

// src/restapi/controlpanels/get_list.ts
async function getControlpanels() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@controlpanels", options);
}

// src/restapi/controlpanels/get.ts
import { z as z26 } from "zod";
var getControlpanelSchema = z26.object({
  id: z26.string()
});
async function getControlpanel({ id }) {
  const validatedArgs = getControlpanelSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const getControlpanelPath = `@controlpanels/${validatedArgs.id}`;
  return apiRequest("get", getControlpanelPath, options);
}

// src/restapi/controlpanels/create.ts
import { z as z27 } from "zod";
var createControlpanelArgsSchema = z27.object({
  path: z27.string(),
  data: z27.any()
});
async function createControlpanel({ path, data }) {
  const validatedArgs = createControlpanelArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const createControlpanelPath = `@controlpanels/${validatedArgs.path}`;
  return apiRequest("post", createControlpanelPath, options);
}

// src/restapi/controlpanels/update.ts
import { z as z28 } from "zod";
var updateControlpanelArgsSchema = z28.object({
  path: z28.string(),
  data: z28.any()
});
async function updateControlpanel({ path, data }) {
  const validatedArgs = updateControlpanelArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const updateControlpanelPath = `@controlpanels/${validatedArgs.path}`;
  return apiRequest("patch", updateControlpanelPath, options);
}

// src/restapi/controlpanels/delete.ts
import { z as z29 } from "zod";
var deleteControlpanelArgsSchema = z29.object({
  path: z29.string(),
  data: z29.any()
});
async function deleteControlpanel({ path, data }) {
  const validatedArgs = deleteControlpanelArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const deleteControlpanelPath = `@controlpanels/${validatedArgs.path}`;
  return apiRequest("delete", deleteControlpanelPath, options);
}

// src/restapi/database/get.ts
async function getDatabase() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@database", options);
}

// src/restapi/email-notification/post.ts
import { z as z30 } from "zod";
var emailNotificationDataSchema = z30.object({
  name: z30.string(),
  from: z30.string(),
  subject: z30.string(),
  message: z30.string()
});
var emailNotificationArgsSchema = z30.object({
  user: z30.string().optional(),
  data: emailNotificationDataSchema
});
async function emailNotification({ user, data }) {
  const validatedArgs = emailNotificationArgsSchema.parse({
    user,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const emailNotificationPath = user ? `/@users/${user}/@email-notification` : "/@email-notification";
  return apiRequest("post", emailNotificationPath, options);
}

// src/restapi/email-send/post.ts
import { z as z31 } from "zod";
var emailSendDataSchema = z31.object({
  name: z31.string(),
  from: z31.string(),
  to: z31.string(),
  subject: z31.string(),
  message: z31.string()
});
var emailSendArgsSchema = z31.object({
  data: emailSendDataSchema
});
async function emailSend({ data }) {
  const validatedArgs = emailSendArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@email-send", options);
}

// src/restapi/groups/get_list.ts
async function getGroups() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@groups", options);
}

// src/restapi/groups/get.ts
import { z as z32 } from "zod";
var getGroupSchema = z32.object({
  id: z32.string()
});
async function getGroup({ id }) {
  const validatedArgs = getGroupSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const groupName = `@groups/${validatedArgs.id}`;
  return apiRequest("get", groupName, options);
}

// src/restapi/groups/create.ts
import { z as z34 } from "zod";

// src/validation/groups.ts
import { z as z33 } from "zod";
var createGroupDataSchema = z33.object({
  description: z33.string().optional(),
  email: z33.string().optional(),
  groupname: z33.string(),
  groups: z33.array(z33.string()).optional(),
  roles: z33.array(z33.string()).optional(),
  title: z33.string().optional(),
  users: z33.array(z33.string()).optional()
});
var updateGroupDataSchema = z33.object({
  description: z33.string().optional(),
  email: z33.string().optional(),
  title: z33.string().optional()
});

// src/restapi/groups/create.ts
var createGroupArgsSchema = z34.object({
  data: createGroupDataSchema
});
async function createGroup({ data }) {
  const validatedArgs = createGroupArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@groups", options);
}

// src/restapi/groups/update.ts
import { z as z35 } from "zod";
var updateGroupArgsSchema = z35.object({
  id: z35.string(),
  data: updateGroupDataSchema
});
async function updateGroup({ id, data }) {
  const validatedArgs = updateGroupArgsSchema.parse({
    id,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const groupName = `/@groups/${validatedArgs.id}`;
  return apiRequest("patch", groupName, options);
}

// src/restapi/groups/delete.ts
import { z as z36 } from "zod";
var deleteGroupArgsSchema = z36.object({
  id: z36.string()
});
async function deleteGroup({ id }) {
  const validatedArgs = deleteGroupArgsSchema.parse({
    id
  });
  const options = {
    config: this.config
  };
  const groupName = `/@groups/${validatedArgs.id}`;
  return apiRequest("delete", groupName, options);
}

// src/restapi/history/get.ts
import { z as z37 } from "zod";
var getHistorySchema = z37.object({
  path: z37.string()
});
async function getHistory({ path }) {
  const validatedArgs = getHistorySchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const historyPath = `/${validatedArgs.path}/@history`;
  return apiRequest("get", historyPath, options);
}

// src/restapi/history/get_version.ts
import { z as z38 } from "zod";
var getHistoryVersionSchema = z38.object({
  path: z38.string(),
  version: z38.number()
});
async function getHistoryVersion({ path, version }) {
  const validatedArgs = getHistoryVersionSchema.parse({
    path,
    version
  });
  const options = {
    config: this.config,
    params: {}
  };
  const historyPath = `${validatedArgs.path}/@history/${validatedArgs.version}`;
  return apiRequest("get", historyPath, options);
}

// src/restapi/history/revert.ts
import { z as z40 } from "zod";

// src/validation/history.ts
import { z as z39 } from "zod";
var revertHistoryDataSchema = z39.object({
  version: z39.number()
});

// src/restapi/history/revert.ts
var revertHistoryArgsSchema = z40.object({
  path: z40.string(),
  data: revertHistoryDataSchema
});
async function revertHistory({ path, data }) {
  const validatedArgs = revertHistoryArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const historyPath = `${validatedArgs.path}/@history`;
  return apiRequest("patch", historyPath, options);
}

// src/restapi/linkintegrity/get.ts
import { z as z41 } from "zod";
var getLinkintegriyArgsSchema = z41.object({
  uids: z41.string()
});
async function getLinkintegrity({ uids }) {
  const validatedArgs = getLinkintegriyArgsSchema.parse({
    uids
  });
  const options = {
    config: this.config,
    params: {
      ...validatedArgs && { uids: validatedArgs.uids }
    }
  };
  return apiRequest("get", "/@linkintegrity", options);
}

// src/restapi/lock/get.ts
import { z as z42 } from "zod";
var getLockSchema = z42.object({
  path: z42.string()
});
async function getLock({ path }) {
  const validatedArgs = getLockSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const getLockPath = `/${validatedArgs.path}/@lock`;
  return apiRequest("get", getLockPath, options);
}

// src/restapi/lock/create.ts
import { z as z44 } from "zod";

// src/validation/lock.ts
import { z as z43 } from "zod";
var createLockDataSchema = z43.object({
  stealable: z43.boolean().optional(),
  timeout: z43.number().optional()
});
var deleteLockDataSchema = z43.object({
  force: z43.boolean().optional()
});

// src/restapi/lock/create.ts
var createLockArgsSchema = z44.object({
  path: z44.string(),
  data: createLockDataSchema
});
async function createLock({ path, data }) {
  const validatedArgs = createLockArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const addLockPath = `/${validatedArgs.path}/@lock`;
  return apiRequest("post", addLockPath, options);
}

// src/restapi/lock/update.ts
import { z as z45 } from "zod";
var updateLockArgsSchema = z45.object({
  path: z45.string(),
  locktoken: z45.string()
});
async function updateLock({ path, locktoken }) {
  const validatedArgs = updateLockArgsSchema.parse({
    path,
    locktoken
  });
  const options = {
    headers: {
      "Lock-Token": validatedArgs.locktoken
    },
    config: this.config
  };
  return apiRequest("patch", validatedArgs.path, options);
}

// src/restapi/lock/delete.ts
import { z as z46 } from "zod";
var deleteLockArgsSchema = z46.object({
  path: z46.string(),
  data: deleteLockDataSchema.optional()
});
async function deleteLock({ path, data }) {
  const validatedArgs = deleteLockArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const deleteLockPath = `/${validatedArgs.path}/@lock`;
  return apiRequest("delete", deleteLockPath, options);
}

// src/restapi/login/post.ts
import { z as z47 } from "zod";
var loginArgsSchema = z47.object({
  data: z47.object({
    login: z47.string(),
    password: z47.string()
  })
});
async function login({ data }) {
  const validatedArgs = loginArgsSchema.parse({ data });
  const options = {
    data: {
      login: validatedArgs.data.login,
      password: validatedArgs.data.password
    },
    config: this.config
  };
  return apiRequest("post", "/@login", options);
}

// src/restapi/navigation/get.ts
import { z as z48 } from "zod";
var getNavigationSchema = z48.object({
  path: z48.string(),
  depth: z48.number().optional()
});
async function getNavigation({ path, depth }) {
  const validatedArgs = getNavigationSchema.parse({
    path,
    depth
  });
  const options = {
    config: this.config,
    params: {}
  };
  const navigationPath = `${validatedArgs.path}/@navigation`;
  if (validatedArgs.depth) {
    options.params["expand.navigation.depth"] = validatedArgs.depth;
  }
  return apiRequest("get", navigationPath, options);
}

// src/restapi/navroot/get.ts
import { z as z49 } from "zod";
var getNavrootSchema = z49.object({
  path: z49.string(),
  language: z49.string().optional()
});
async function getNavroot({ path, language }) {
  const validatedArgs = getNavrootSchema.parse({
    path,
    language
  });
  const options = {
    config: this.config,
    params: {}
  };
  const navrootPath = language ? `/${validatedArgs.language}/${validatedArgs.path}/@navroot` : `/${validatedArgs.path}/@navroot`;
  return apiRequest("get", navrootPath, options);
}

// src/restapi/principals/get.ts
import { z as z50 } from "zod";
var getPrincipalsSchema = z50.object({
  search: z50.string()
});
async function getPrincipals({ search: search2 }) {
  const validatedArgs = getPrincipalsSchema.parse({
    search: search2
  });
  const options = {
    config: this.config,
    params: {}
  };
  const principalsPath = `/@principals?search=${validatedArgs.search}`;
  return apiRequest("get", principalsPath, options);
}

// src/restapi/querysources/get.ts
import { z as z51 } from "zod";
var getQuerysourcesSchema = z51.object({
  path: z51.string(),
  field: z51.string(),
  query: z51.string()
});
async function getQuerysources({ path, field, query: query2 }) {
  const validatedArgs = getQuerysourcesSchema.parse({
    path,
    field,
    query: query2
  });
  const options = {
    config: this.config,
    params: {
      ...validatedArgs.query && { query: validatedArgs.query }
    }
  };
  const querysourcePath = `/${validatedArgs.path}/@querysources/${field}`;
  return apiRequest("get", querysourcePath, options);
}

// src/restapi/querystring/get.ts
async function getQuerystring() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@querystring", options);
}

// src/restapi/querystring-search/get.ts
import "zod";

// src/validation/querystring-search.ts
import { z as z52 } from "zod";
var query = z52.object({
  i: z52.string(),
  o: z52.string(),
  v: z52.union([z52.string(), z52.array(z52.string())])
});
var querystringSearchDataSchema = z52.object({
  b_start: z52.string().optional(),
  b_size: z52.string().optional(),
  limit: z52.string().optional(),
  sort_on: z52.string().optional(),
  sort_order: z52.string().optional(),
  fullobjects: z52.boolean().optional(),
  query: z52.array(query),
  post: z52.boolean().optional()
});

// src/restapi/querystring-search/get.ts
async function querystringSearch({ query: query2, post }) {
  const validatedArgs = querystringSearchDataSchema.parse({
    query: query2
  });
  if (post) {
    const options = {
      data: { query: validatedArgs.query },
      config: this.config
    };
    return apiRequest("post", "/@querystring-search", options);
  } else {
    const queryObject = { query: validatedArgs.query };
    const querystring = JSON.stringify(queryObject);
    const encodedQuery = encodeURIComponent(querystring);
    const options = {
      config: this.config,
      params: {
        ...encodedQuery && { query: encodedQuery }
      }
    };
    return apiRequest("get", "/@querystring-search", options);
  }
}

// src/restapi/registry/get_list.ts
async function getRegistry() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@registry", options);
}

// src/restapi/registry/get.ts
import { z as z54 } from "zod";
var getRegistryRecordSchema = z54.object({
  name: z54.string()
});
async function getRegistryRecord({ name }) {
  const validatedArgs = getRegistryRecordSchema.parse({
    name
  });
  const options = {
    config: this.config,
    params: {}
  };
  const registryPath = `/@registry/${validatedArgs.name}`;
  return apiRequest("get", registryPath, options);
}

// src/restapi/registry/update.ts
import { z as z56 } from "zod";

// src/validation/registry.ts
import { z as z55 } from "zod";
var updateRegistryDataSchema = z55.record(z55.any());

// src/restapi/registry/update.ts
var updateRegistryArgsSchema = z56.object({
  data: updateRegistryDataSchema
});
async function updateRegistry({ data }) {
  const validatedArgs = updateRegistryArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("patch", "/@registry", options);
}

// src/restapi/relations/get_list.ts
async function getAllRelations() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@relations", options);
}

// src/restapi/relations/get.ts
import { z as z57 } from "zod";
var getRelationsSchema = z57.object({
  source: z57.string().optional(),
  relation: z57.string().optional(),
  onlyBroken: z57.boolean().optional()
}).refine((data) => {
  return data.source !== void 0 || data.relation !== void 0;
});
async function getRelations({ source, relation, onlyBroken }) {
  const validatedArgs = getRelationsSchema.parse({
    source,
    relation,
    onlyBroken
  });
  const options = {
    config: this.config,
    params: {
      ...validatedArgs.source && { source: validatedArgs.source },
      ...validatedArgs.relation && { relation: validatedArgs.relation },
      ...validatedArgs.onlyBroken && { relation: validatedArgs.onlyBroken }
    }
  };
  return apiRequest("get", "/@relations", options);
}

// src/restapi/relations/create.ts
import { z as z59 } from "zod";

// src/validation/relations.ts
import { z as z58 } from "zod";
var RelationDataSchema = z58.object({
  relation: z58.string(),
  source: z58.string(),
  target: z58.string()
});
var createRelationsDataSchema = z58.object({
  items: z58.array(RelationDataSchema)
});
var deleteRelationsDataSchema = z58.object({
  items: z58.array(RelationDataSchema).optional(),
  relation: z58.string().optional(),
  source: z58.string().optional(),
  target: z58.string().optional()
});
var fixRelationsDataSchema = z58.object({
  flush: z58.number().optional()
});

// src/restapi/relations/create.ts
var createRelationsArgsSchema = z59.object({
  data: createRelationsDataSchema
});
async function createRelations({ data }) {
  const validatedArgs = createRelationsArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@relations", options);
}

// src/restapi/relations/fix.ts
import { z as z60 } from "zod";
var fixRelationsArgsSchema = z60.object({
  data: fixRelationsDataSchema.optional()
});
async function fixRelations({ data }) {
  const validatedArgs = fixRelationsArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "@relations/rebuild", options);
}

// src/restapi/relations/delete.ts
import { z as z61 } from "zod";
var deleteRelationsArgsSchema = z61.object({
  data: deleteRelationsDataSchema
});
async function deleteRelations({ data }) {
  const validatedArgs = deleteRelationsArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("delete", "/@relations", options);
}

// src/restapi/roles/get.ts
async function getRoles() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@roles", options);
}

// src/restapi/rules/get.ts
async function getRules() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@content-rules", options);
}

// src/restapi/rules/create.ts
import { z as z62 } from "zod";
var createRuleArgsSchema = z62.object({
  ruleId: z62.string()
});
async function createRule({ ruleId }) {
  const validatedArgs = createRuleArgsSchema.parse({
    ruleId
  });
  const options = {
    config: this.config
  };
  const addRulePath = `/@content-rules/${validatedArgs.ruleId}`;
  return apiRequest("post", addRulePath, options);
}

// src/restapi/rules/update.ts
import { z as z64 } from "zod";

// src/validation/rules.ts
import { z as z63 } from "zod";
var updateRulesDataSchema = z63.object({
  "form.button.Bubble": z63.boolean().optional(),
  "form.button.NoBubble": z63.boolean().optional(),
  "form.button.Enable": z63.boolean().optional(),
  "form.button.Disable": z63.boolean().optional(),
  rules_ids: z63.array(z63.string()).optional(),
  operation: z63.string().optional(),
  rule_id: z63.string().optional()
});
var deleteRulesDataSchema = z63.object({
  rules_ids: z63.array(z63.string())
});

// src/restapi/rules/update.ts
var updateRulesArgsSchema = z64.object({
  data: updateRulesDataSchema
});
async function updateRules({ data }) {
  const validatedArgs = updateRulesArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("patch", "/@content-rules", options);
}

// src/restapi/rules/delete.ts
import { z as z65 } from "zod";
var deleteRulesArgsSchema = z65.object({
  data: deleteRulesDataSchema
});
async function deleteRules({ data }) {
  const validatedArgs = deleteRulesArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const deleteRulesPath = `/@content-rules`;
  return apiRequest("delete", deleteRulesPath, options);
}

// src/restapi/search/get.ts
import "zod";

// src/validation/search.ts
import { z as z66 } from "zod";
var querySchema = z66.object({
  path: z66.object({
    query: z66.union([z66.string(), z66.array(z66.string())]),
    depth: z66.number().optional()
  }).optional(),
  sort_on: z66.union([z66.string(), z66.array(z66.string())]).optional(),
  SearchableText: z66.string().optional(),
  metadata_fields: z66.union([z66.string(), z66.array(z66.string())]).optional(),
  fullobjects: z66.number().optional()
}).and(z66.record(z66.any()));
var searchSchema = z66.object({
  query: querySchema
});

// src/restapi/search/get.ts
var flattenToDottedNotation = (obj, prefix = "") => {
  const result = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      Object.assign(result, flattenToDottedNotation(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
};
async function search({ query: query2 }) {
  const validatedArgs = searchSchema.parse({
    query: query2
  });
  const flattenedQuery = flattenToDottedNotation(validatedArgs.query);
  const options = {
    config: this.config,
    params: {
      ...flattenedQuery,
      "path.query": void 0
    }
  };
  return apiRequest("get", `${query2.path?.query ?? ""}/@search`, options);
}

// src/restapi/site/get.ts
async function getSite() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@site", options);
}

// src/restapi/sources/get.ts
import { z as z68 } from "zod";
var getSourceSchema = z68.object({
  path: z68.string(),
  field: z68.string()
});
async function getSource({ path, field }) {
  const validatedArgs = getSourceSchema.parse({
    path,
    field
  });
  const options = {
    config: this.config
  };
  const sourcePath = `/${validatedArgs.path}/@sources/${field}`;
  return apiRequest("get", sourcePath, options);
}

// src/restapi/system/get.ts
async function getSystem() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@system", options);
}

// src/restapi/transactions/get.ts
async function getTransactions() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@transactions", options);
}

// src/restapi/transactions/revert.ts
import { z as z70 } from "zod";

// src/validation/transactions.ts
import { z as z69 } from "zod";
var revertTransactionsDataSchema = z69.object({
  transaction_ids: z69.array(z69.string())
});

// src/restapi/transactions/revert.ts
var revertTransactionsArgsSchema = z70.object({
  data: revertTransactionsDataSchema
});
async function revertTransactions({ data }) {
  const validatedArgs = revertTransactionsArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("patch", "/@transactions", options);
}

// src/restapi/translations/get.ts
import { z as z71 } from "zod";
var getTranslationSchema = z71.object({
  path: z71.string()
});
async function getTranslation({ path }) {
  const validatedArgs = getTranslationSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const translationsPath = `${validatedArgs.path}/@translations`;
  return apiRequest("get", translationsPath, options);
}

// src/restapi/translations/link.ts
import { z as z73 } from "zod";

// src/validation/translations.ts
import { z as z72 } from "zod";
var linkTranslationDataSchema = z72.object({
  id: z72.string()
});
var unlinkTranslationDataSchema = z72.object({
  language: z72.string()
});

// src/restapi/translations/link.ts
var linkTranslationArgsSchema = z73.object({
  path: z73.string(),
  data: linkTranslationDataSchema
});
async function linkTranslation({ path, data }) {
  const validatedArgs = linkTranslationArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const translationsPath = `${validatedArgs.path}/@translations`;
  return apiRequest("post", translationsPath, options);
}

// src/restapi/translations/unlink.ts
import { z as z74 } from "zod";
var unlinkTranslationArgsSchema = z74.object({
  path: z74.string(),
  data: unlinkTranslationDataSchema
});
async function unlinkTranslation({ path, data }) {
  const validatedArgs = unlinkTranslationArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const translationsPath = `${validatedArgs.path}/@translations`;
  return apiRequest("delete", translationsPath, options);
}

// src/restapi/types/get_list.ts
async function getTypes() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@types", options);
}

// src/restapi/types/get.ts
import { z as z75 } from "zod";
var getTypeSchema = z75.object({
  type: z75.string()
});
async function getType({ type }) {
  const validatedArgs = getTypeSchema.parse({
    type
  });
  const options = {
    config: this.config,
    params: {}
  };
  const contentPathPath = `/@types/${validatedArgs.type}`;
  return apiRequest("get", contentPathPath, options);
}

// src/restapi/types/get_type_field.ts
import { z as z76 } from "zod";
var getTypeFieldSchema = z76.object({
  contentFieldPath: z76.string()
});
async function getTypeField({ contentFieldPath }) {
  const validatedArgs = getTypeFieldSchema.parse({
    contentFieldPath
  });
  const options = {
    config: this.config,
    params: {}
  };
  const contentFieldPathPath = `/@types/${validatedArgs.contentFieldPath}`;
  return apiRequest("get", contentFieldPathPath, options);
}

// src/restapi/types/create_type_field.ts
import { z as z78 } from "zod";

// src/validation/types.ts
import { z as z77 } from "zod";
var createTypeFieldDataSchema = z77.object({
  description: z77.string(),
  factory: z77.string(),
  required: z77.boolean().optional(),
  title: z77.string()
});
var updateTypeFieldDataSchema = z77.object({
  description: z77.string().optional(),
  maxLength: z77.number().optional(),
  minLength: z77.number().optional(),
  fields: z77.array(z77.string()).optional(),
  required: z77.boolean().optional(),
  title: z77.string().optional(),
  properties: z77.any().optional(),
  fieldsets: z77.array(z77.any()).optional()
});

// src/restapi/types/create_type_field.ts
var createTypeFieldArgsSchema = z78.object({
  contentPath: z78.string(),
  data: createTypeFieldDataSchema
});
async function createTypeField({ contentPath, data }) {
  const validatedArgs = createTypeFieldArgsSchema.parse({
    contentPath,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const addTypeFieldPath = `/@types/${validatedArgs.contentPath}`;
  return apiRequest("post", addTypeFieldPath, options);
}

// src/restapi/types/update_type_field.ts
import { z as z79 } from "zod";
var updateTypeFieldArgsSchema = z79.object({
  contentPath: z79.string(),
  data: updateTypeFieldDataSchema
});
async function updateTypeField({ contentPath, data }) {
  const validatedArgs = updateTypeFieldArgsSchema.parse({
    contentPath,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const updateTypeFieldPath = `/@types/${validatedArgs.contentPath}`;
  return apiRequest("patch", updateTypeFieldPath, options);
}

// src/restapi/upgrade/get.ts
async function getUpgrade() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@upgrade", options);
}

// src/restapi/upgrade/run.ts
import { z as z81 } from "zod";

// src/validation/upgrade.ts
import { z as z80 } from "zod";
var runUpgradeDataSchema = z80.object({
  dry_run: z80.boolean()
});

// src/restapi/upgrade/run.ts
var runUpgradeArgsSchema = z81.object({
  data: runUpgradeDataSchema
});
async function runUpgrade({ data }) {
  const validatedArgs = runUpgradeArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@upgrade", options);
}

// src/restapi/users/get_list.ts
import { z as z82 } from "zod";
var getUsersSchema = z82.object({
  query: z82.string().optional(),
  groupsFilter: z82.array(z82.string()).optional(),
  search: z82.string().optional(),
  limit: z82.number().optional()
});
async function getUsers({ query: query2, groupsFilter, search: search2, limit }) {
  const validatedArgs = getUsersSchema.parse({
    query: query2,
    groupsFilter,
    search: search2,
    limit
  });
  const options = {
    config: this.config,
    params: {
      ...validatedArgs.query && { query: validatedArgs.query },
      ...validatedArgs.groupsFilter && {
        "groups-filter": validatedArgs.groupsFilter
      },
      ...validatedArgs.limit && { limit: validatedArgs.limit },
      ...validatedArgs.search && { search: validatedArgs.search }
    }
  };
  return apiRequest("get", "/@users", options).then(
    // Backwards compatibility for change in plone.restapi 10.
    // The list of users is now inside the `items` property.
    (response) => ({ ...response, data: response.data.items ?? response.data })
  );
}

// src/restapi/users/get.ts
import { z as z83 } from "zod";
var getUserSchema = z83.object({
  id: z83.string()
});
async function getUser({ id }) {
  const validatedArgs = getUserSchema.parse({
    id
  });
  const options = {
    config: this.config,
    params: {}
  };
  const userName = `@users/${validatedArgs.id}`;
  return apiRequest("get", userName, options);
}

// src/restapi/users/create.ts
import { z as z85 } from "zod";

// src/validation/users.ts
import { z as z84 } from "zod";
var createUserDataSchema = z84.object({
  description: z84.string().optional(),
  email: z84.string().email(),
  fullname: z84.string().optional(),
  home_page: z84.string().url().optional(),
  location: z84.string().optional(),
  sendPasswordReset: z84.boolean().optional(),
  username: z84.string(),
  roles: z84.array(z84.string()).optional(),
  password: z84.string().optional()
});
var portraitSchema = z84.object({
  "content-type": z84.string(),
  data: z84.string(),
  encoding: z84.string(),
  filename: z84.string(),
  scale: z84.boolean().optional()
});
var updateUserDataSchema = z84.object({
  description: z84.string().optional(),
  email: z84.string().email().optional(),
  fullname: z84.string().optional(),
  home_page: z84.string().url().optional(),
  location: z84.string().optional(),
  username: z84.string().optional(),
  portrait: portraitSchema.optional()
});
var resetPasswordWithTokenDataSchema = z84.object({
  reset_token: z84.string(),
  new_password: z84.string()
});
var updatePasswordDataSchema = z84.object({
  new_password: z84.string(),
  old_password: z84.string()
});

// src/restapi/users/create.ts
var createUserArgsSchema = z85.object({
  data: createUserDataSchema
});
async function createUser({ data }) {
  const validatedArgs = createUserArgsSchema.parse({
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  return apiRequest("post", "/@users", options);
}

// src/restapi/users/update.ts
import { z as z86 } from "zod";
var updateUserArgsSchema = z86.object({
  id: z86.string(),
  data: updateUserDataSchema
});
async function updateUser({ id, data }) {
  const validatedArgs = updateUserArgsSchema.parse({
    id,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const userName = `/@users/${validatedArgs.id}`;
  return apiRequest("patch", userName, options);
}

// src/restapi/users/delete.ts
import { z as z87 } from "zod";
var deleteUserArgsSchema = z87.object({
  id: z87.string()
});
async function deleteUser({ id }) {
  const validatedArgs = deleteUserArgsSchema.parse({
    id
  });
  const options = {
    config: this.config
  };
  const userName = `/@users/${validatedArgs.id}`;
  return apiRequest("delete", userName, options);
}

// src/restapi/users/reset_password.ts
import { z as z88 } from "zod";
var resetPasswordArgsSchema = z88.object({
  id: z88.string()
});
async function resetPassword({ id }) {
  const validatedArgs = resetPasswordArgsSchema.parse({
    id
  });
  const options = {
    config: this.config
  };
  const userName = `@users/${validatedArgs.id}/reset-password`;
  return apiRequest("post", userName, options);
}

// src/restapi/users/reset_password_with_token.ts
import { z as z89 } from "zod";
var resetPasswordWithTokenArgsSchema = z89.object({
  id: z89.string(),
  data: resetPasswordWithTokenDataSchema
});
async function resetPasswordWithToken({ id, data }) {
  const validatedArgs = resetPasswordWithTokenArgsSchema.parse({
    id,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const userName = `@users/${validatedArgs.id}/reset-password`;
  return apiRequest("post", userName, options);
}

// src/restapi/users/update_password.ts
import { z as z90 } from "zod";
var updatePasswordArgsSchema = z90.object({
  id: z90.string(),
  data: updatePasswordDataSchema
});
async function updatePassword({ id, data }) {
  const validatedArgs = updatePasswordArgsSchema.parse({
    id,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const userName = `@users/${validatedArgs.id}/reset-password`;
  return apiRequest("post", userName, options);
}

// src/restapi/userschema/get.ts
async function getUserschema() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@userschema", options);
}

// src/restapi/vocabularies/get_list.ts
async function getVocabularies() {
  const options = {
    config: this.config,
    params: {}
  };
  return apiRequest("get", "/@vocabularies", options);
}

// src/restapi/vocabularies/get.ts
import { z as z91 } from "zod";
var getVocabularySchema = z91.object({
  path: z91.string(),
  title: z91.string().optional(),
  token: z91.string().optional(),
  tokens: z91.array(z91.string()).optional()
});
async function getVocabulary({ path, title, token, tokens }) {
  const validatedArgs = getVocabularySchema.parse({
    path,
    title,
    token,
    tokens
  });
  const options = {
    config: this.config,
    params: {
      ...validatedArgs.title && { title: validatedArgs.title },
      ...validatedArgs.token && { token: validatedArgs.token },
      ...validatedArgs.tokens && { tokens: validatedArgs.tokens }
    }
  };
  const vocabulariesPath = `@vocabularies/${validatedArgs.path}`;
  return apiRequest("get", vocabulariesPath, options);
}

// src/restapi/workflow/get.ts
import { z as z92 } from "zod";
var getWorkflowSchema = z92.object({
  path: z92.string()
});
async function getWorkflow({ path }) {
  const validatedArgs = getWorkflowSchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const workflowPath = `${validatedArgs.path}/@workflow`;
  return apiRequest("get", workflowPath, options);
}

// src/restapi/workflow/create.ts
import { z as z94 } from "zod";

// src/validation/workflow.ts
import { z as z93 } from "zod";
var createWorkflowDataSchema = z93.object({
  comment: z93.string().optional(),
  effective: z93.string().optional(),
  expires: z93.string().optional(),
  include_children: z93.boolean().optional()
});

// src/restapi/workflow/create.ts
var createWorkflowArgsSchema = z94.object({
  path: z94.string(),
  data: createWorkflowDataSchema.optional()
});
async function createWorkflow({ path, data }) {
  const validatedArgs = createWorkflowArgsSchema.parse({
    path,
    data
  });
  const options = {
    data: validatedArgs.data,
    config: this.config
  };
  const workflowPath = `${validatedArgs.path}/@workflow/publish`;
  return apiRequest("post", workflowPath, options);
}

// src/restapi/workingcopy/get.ts
import { z as z95 } from "zod";
var getWorkingcopySchema = z95.object({
  path: z95.string()
});
async function getWorkingcopy({ path }) {
  const validatedArgs = getWorkingcopySchema.parse({
    path
  });
  const options = {
    config: this.config,
    params: {}
  };
  const workingcopyPath = `/${validatedArgs.path}/@workingcopy`;
  return apiRequest("get", workingcopyPath, options);
}

// src/restapi/workingcopy/create.ts
import { z as z96 } from "zod";
var createWorkingcopyArgsSchema = z96.object({
  path: z96.string()
});
async function createWorkingcopy({ path }) {
  const validatedArgs = createWorkingcopyArgsSchema.parse({
    path
  });
  const options = {
    config: this.config
  };
  const createWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;
  return apiRequest("post", createWorkingcopyPath, options);
}

// src/restapi/workingcopy/check-in.ts
import { z as z97 } from "zod";
var checkInWorkingcopyArgsSchema = z97.object({
  path: z97.string()
});
async function checkInWorkingcopy({ path }) {
  const validatedArgs = checkInWorkingcopyArgsSchema.parse({
    path
  });
  const options = {
    config: this.config
  };
  const checkInWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;
  return apiRequest("patch", checkInWorkingcopyPath, options);
}

// src/restapi/workingcopy/delete.ts
import { z as z98 } from "zod";
var deleteWorkingcopyArgsSchema = z98.object({
  path: z98.string()
});
async function deleteWorkingcopy({ path }) {
  const validatedArgs = deleteWorkingcopyArgsSchema.parse({
    path
  });
  const options = {
    config: this.config
  };
  const deleteWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;
  return apiRequest("delete", deleteWorkingcopyPath, options);
}

// src/client.ts
var PLONECLIENT_DEFAULT_CONFIG = {
  apiPath: "http://localhost:8080/Plone"
};
var PloneClient = class _PloneClient {
  config = PLONECLIENT_DEFAULT_CONFIG;
  static initialize = (config) => new _PloneClient({ ...PLONECLIENT_DEFAULT_CONFIG, ...config });
  constructor(config) {
    this.config = config;
    Object.values(this).forEach((propertyValue) => {
      if (propertyValue instanceof Function) {
        propertyValue = propertyValue.bind(this);
      }
    });
  }
  getActions = getActions;
  getAddons = getAddons;
  getAddon = getAddon;
  installAddon = installAddon;
  uninstallAddon = uninstallAddon;
  upgradeAddon = upgradeAddon;
  installAddonProfile = installAddonProfile;
  getAllAliases = getAllAliases;
  getAliases = getAliases;
  createAlias = createAlias;
  createAliases = createAliases;
  deleteAliases = deleteAliases;
  getBreadcrumbs = getBreadcrumbs;
  getComments = getComments;
  createComment = createComment;
  updateComment = updateComment;
  deleteComment = deleteComment;
  getContent = getContent;
  createContent = createContent;
  updateContent = updateContent;
  deleteContent = deleteContent;
  copyContent = copyContent;
  moveContent = moveContent;
  getContextNavigation = getContextNavigation;
  getControlpanels = getControlpanels;
  getControlpanel = getControlpanel;
  createControlpanel = createControlpanel;
  updateControlpanel = updateControlpanel;
  deleteControlpanel = deleteControlpanel;
  getDatabase = getDatabase;
  emailNotification = emailNotification;
  emailSend = emailSend;
  getGroups = getGroups;
  getGroup = getGroup;
  createGroup = createGroup;
  updateGroup = updateGroup;
  deleteGroup = deleteGroup;
  getHistory = getHistory;
  getHistoryVersion = getHistoryVersion;
  revertHistory = revertHistory;
  getLinkintegrity = getLinkintegrity;
  getLock = getLock;
  createLock = createLock;
  updateLock = updateLock;
  deleteLock = deleteLock;
  login = login;
  getNavigation = getNavigation;
  getNavroot = getNavroot;
  getPrincipals = getPrincipals;
  getQuerysources = getQuerysources;
  getQuerystring = getQuerystring;
  querystringSearch = querystringSearch;
  getRegistry = getRegistry;
  getRegistryRecord = getRegistryRecord;
  updateRegistry = updateRegistry;
  getAllRelations = getAllRelations;
  getRelations = getRelations;
  createRelations = createRelations;
  fixRelations = fixRelations;
  deleteRelations = deleteRelations;
  getRoles = getRoles;
  getRules = getRules;
  createRule = createRule;
  updateRules = updateRules;
  deleteRules = deleteRules;
  search = search;
  getSite = getSite;
  getSource = getSource;
  getSystem = getSystem;
  getTransactions = getTransactions;
  revertTransactions = revertTransactions;
  getTranslation = getTranslation;
  linkTranslation = linkTranslation;
  unlinkTranslation = unlinkTranslation;
  getTypes = getTypes;
  getType = getType;
  getTypeField = getTypeField;
  createTypeField = createTypeField;
  updateTypeField = updateTypeField;
  getUpgrade = getUpgrade;
  runUpgrade = runUpgrade;
  getUsers = getUsers;
  getUser = getUser;
  createUser = createUser;
  updateUser = updateUser;
  deleteUser = deleteUser;
  resetPassword = resetPassword;
  resetPasswordWithToken = resetPasswordWithToken;
  updatePassword = updatePassword;
  getUserschema = getUserschema;
  getVocabularies = getVocabularies;
  getVocabulary = getVocabulary;
  getWorkflow = getWorkflow;
  createWorkflow = createWorkflow;
  getWorkingcopy = getWorkingcopy;
  createWorkingcopy = createWorkingcopy;
  checkInWorkingcopy = checkInWorkingcopy;
  deleteWorkingcopy = deleteWorkingcopy;
};

// src/index.ts
var index_default = PloneClient;
export {
  index_default as default
};
