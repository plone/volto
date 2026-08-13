"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/api.ts
var import_axios = __toESM(require("axios"), 1);
var import_query_string = __toESM(require("query-string"), 1);
var import_debug = __toESM(require("debug"), 1);
var debug = (0, import_debug.default)("axios");
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
      return import_query_string.default.stringify(params2, { arrayFormat: "colon-list-separator" });
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
  const instance = import_axios.default.create();
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
var import_zod = require("zod");
var getActionsSchema = import_zod.z.object({
  path: import_zod.z.string()
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
var import_zod2 = require("zod");
var getAddonSchema = import_zod2.z.object({
  id: import_zod2.z.string()
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
var import_zod3 = require("zod");
var installAddonSchema = import_zod3.z.object({
  id: import_zod3.z.string()
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
var import_zod4 = require("zod");
var uninstallAddonSchema = import_zod4.z.object({
  id: import_zod4.z.string()
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
var import_zod5 = require("zod");
var upgradeAddonSchema = import_zod5.z.object({
  id: import_zod5.z.string()
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
var import_zod6 = require("zod");
var installAddonProfileSchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  profile: import_zod6.z.string()
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
var import_zod7 = require("zod");
var getAliasesSchema = import_zod7.z.object({
  path: import_zod7.z.string()
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
var import_zod9 = require("zod");

// src/validation/aliases.ts
var import_zod8 = require("zod");
var itemSchema = import_zod8.z.object({
  path: import_zod8.z.string()
});
var createAliasDataSchema = import_zod8.z.object({
  items: import_zod8.z.array(itemSchema)
});
var deleteAliasesDataSchema = import_zod8.z.object({
  items: import_zod8.z.array(itemSchema)
});
var rootItemSchema = import_zod8.z.object({
  datetime: import_zod8.z.string().optional(),
  path: import_zod8.z.string(),
  "redirect-to": import_zod8.z.string()
});
var createAliasesDataSchema = import_zod8.z.object({
  items: import_zod8.z.array(rootItemSchema)
});

// src/restapi/aliases/create.ts
var createAliasArgsSchema = import_zod9.z.object({
  path: import_zod9.z.string(),
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
var import_zod10 = require("zod");
var createAliasesArgsSchema = import_zod10.z.object({
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
var import_zod11 = require("zod");
var deleteAliasesArgsSchema = import_zod11.z.object({
  path: import_zod11.z.string(),
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
var import_zod12 = require("zod");
var getBreadcrumbsSchema = import_zod12.z.object({
  path: import_zod12.z.string()
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
var import_zod13 = require("zod");
var getCommentsSchema = import_zod13.z.object({
  path: import_zod13.z.string()
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
var import_zod15 = require("zod");

// src/validation/comments.ts
var import_zod14 = require("zod");
var createCommentDataSchema = import_zod14.z.object({
  text: import_zod14.z.string()
});

// src/restapi/comments/create.ts
var createCommentArgsSchema = import_zod15.z.object({
  path: import_zod15.z.string(),
  in_reply_to: import_zod15.z.string().optional(),
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
var import_zod16 = require("zod");
var updateCommentArgsSchema = import_zod16.z.object({
  path: import_zod16.z.string(),
  comment_id: import_zod16.z.string(),
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
var import_zod17 = require("zod");
var deleteCommentArgsSchema = import_zod17.z.object({
  path: import_zod17.z.string(),
  comment_id: import_zod17.z.string()
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
var import_zod18 = require("zod");
var getContentArgsSchema = import_zod18.z.object({
  path: import_zod18.z.string(),
  version: import_zod18.z.string().optional(),
  page: import_zod18.z.number().optional(),
  fullObjects: import_zod18.z.boolean().optional(),
  expand: import_zod18.z.string().array().optional()
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
var import_zod20 = require("zod");

// src/validation/content.ts
var import_zod19 = require("zod");
var RelatedItemPayloadSchema = import_zod19.z.object({
  "@id": import_zod19.z.string(),
  "@type": import_zod19.z.string(),
  CreationDate: import_zod19.z.string(),
  Creator: import_zod19.z.string(),
  Date: import_zod19.z.string(),
  Description: import_zod19.z.string(),
  EffectiveDate: import_zod19.z.unknown(),
  ExpirationDate: import_zod19.z.unknown(),
  ModificationDate: import_zod19.z.string(),
  Subject: import_zod19.z.array(import_zod19.z.unknown()),
  Title: import_zod19.z.string(),
  Type: import_zod19.z.string(),
  UID: import_zod19.z.string(),
  author_name: import_zod19.z.unknown(),
  cmf_uid: import_zod19.z.unknown(),
  commentators: import_zod19.z.array(import_zod19.z.unknown()),
  created: import_zod19.z.string(),
  description: import_zod19.z.string(),
  effective: import_zod19.z.string(),
  end: import_zod19.z.unknown(),
  exclude_from_nav: import_zod19.z.boolean(),
  expires: import_zod19.z.string(),
  getIcon: import_zod19.z.unknown(),
  getId: import_zod19.z.string(),
  getObjSize: import_zod19.z.string(),
  getPath: import_zod19.z.string(),
  getRemoteUrl: import_zod19.z.unknown(),
  getURL: import_zod19.z.string(),
  hasPreviewImage: import_zod19.z.unknown(),
  head_title: import_zod19.z.unknown(),
  id: import_zod19.z.string(),
  image_field: import_zod19.z.string().nullable(),
  image_scales: import_zod19.z.unknown(),
  in_response_to: import_zod19.z.unknown(),
  is_folderish: import_zod19.z.boolean(),
  last_comment_date: import_zod19.z.unknown(),
  listCreators: import_zod19.z.array(import_zod19.z.string()),
  location: import_zod19.z.unknown(),
  mime_type: import_zod19.z.string(),
  modified: import_zod19.z.string(),
  nav_title: import_zod19.z.unknown(),
  portal_type: import_zod19.z.string(),
  review_state: import_zod19.z.string(),
  start: import_zod19.z.unknown(),
  sync_uid: import_zod19.z.unknown(),
  title: import_zod19.z.string(),
  total_comments: import_zod19.z.number()
}).partial().required({
  "@id": true,
  title: true
});
var createContentDataSchema = import_zod19.z.object({
  "@id": import_zod19.z.string().optional(),
  "@static_behaviors": import_zod19.z.unknown().optional(),
  "@type": import_zod19.z.string(),
  allow_discussion: import_zod19.z.boolean().optional(),
  blocks: import_zod19.z.unknown().optional(),
  blocks_layout: import_zod19.z.object({ items: import_zod19.z.array(import_zod19.z.string()) }).optional(),
  contributors: import_zod19.z.array(import_zod19.z.string()).optional(),
  creators: import_zod19.z.array(import_zod19.z.string()).optional(),
  description: import_zod19.z.string().optional(),
  effective: import_zod19.z.string().nullable().optional(),
  exclude_from_nav: import_zod19.z.boolean().optional(),
  expires: import_zod19.z.string().nullable().optional(),
  file: import_zod19.z.object({
    "content-type": import_zod19.z.string(),
    data: import_zod19.z.string(),
    encoding: import_zod19.z.string(),
    filename: import_zod19.z.string()
  }).optional(),
  id: import_zod19.z.string().optional(),
  image: import_zod19.z.object({
    "content-type": import_zod19.z.string(),
    data: import_zod19.z.string(),
    encoding: import_zod19.z.string(),
    filename: import_zod19.z.string()
  }).optional(),
  language: import_zod19.z.string().optional(),
  preview_caption: import_zod19.z.string().optional(),
  preview_image: import_zod19.z.object({
    "content-type": import_zod19.z.string(),
    data: import_zod19.z.string(),
    encoding: import_zod19.z.string(),
    filename: import_zod19.z.string()
  }).optional(),
  relatedItems: import_zod19.z.array(RelatedItemPayloadSchema).optional(),
  rights: import_zod19.z.string().nullable().optional(),
  title: import_zod19.z.string(),
  versioning_enabled: import_zod19.z.boolean().optional()
});
var updateContentDataSchema = import_zod19.z.object({
  allow_discussion: import_zod19.z.boolean().optional(),
  blocks: import_zod19.z.unknown().optional(),
  blocks_layout: import_zod19.z.object({ items: import_zod19.z.array(import_zod19.z.string()) }).optional(),
  contributors: import_zod19.z.array(import_zod19.z.string()).optional(),
  creators: import_zod19.z.array(import_zod19.z.string()).optional(),
  description: import_zod19.z.string().optional(),
  effective: import_zod19.z.string().nullable().optional(),
  exclude_from_nav: import_zod19.z.boolean().optional(),
  expires: import_zod19.z.string().nullable().optional(),
  id: import_zod19.z.string().nullable().optional(),
  ordering: import_zod19.z.object({
    obj_id: import_zod19.z.string(),
    delta: import_zod19.z.union([import_zod19.z.number(), import_zod19.z.literal("bottom"), import_zod19.z.literal("top")]),
    subset_ids: import_zod19.z.array(import_zod19.z.string()).optional()
  }).optional(),
  preview_caption: import_zod19.z.string().nullable().optional(),
  preview_image: import_zod19.z.object({
    "content-type": import_zod19.z.string(),
    data: import_zod19.z.string(),
    encoding: import_zod19.z.string(),
    filename: import_zod19.z.string()
  }).nullable().optional(),
  relatedItems: import_zod19.z.array(RelatedItemPayloadSchema).optional(),
  rights: import_zod19.z.string().nullable().optional(),
  table_of_contents: import_zod19.z.boolean().nullable().optional(),
  title: import_zod19.z.string().optional(),
  versioning_enabled: import_zod19.z.boolean().optional()
}).partial();
var copyMoveContentDataSchema = import_zod19.z.object({
  path: import_zod19.z.string(),
  data: import_zod19.z.object({
    source: import_zod19.z.union([import_zod19.z.string(), import_zod19.z.array(import_zod19.z.string())])
  })
});

// src/restapi/content/create.ts
var createContentArgsSchema = import_zod20.z.object({
  path: import_zod20.z.string(),
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
var import_zod21 = require("zod");
var updateContentArgsSchema = import_zod21.z.object({
  path: import_zod21.z.string(),
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
var import_zod22 = require("zod");
var deleteContentArgsSchema = import_zod22.z.object({
  path: import_zod22.z.string()
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
var import_zod23 = require("zod");
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
var import_zod24 = require("zod");
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
var import_zod25 = require("zod");
var getContextNavigationSchema = import_zod25.z.object({
  path: import_zod25.z.string()
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
var import_zod26 = require("zod");
var getControlpanelSchema = import_zod26.z.object({
  id: import_zod26.z.string()
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
var import_zod27 = require("zod");
var createControlpanelArgsSchema = import_zod27.z.object({
  path: import_zod27.z.string(),
  data: import_zod27.z.any()
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
var import_zod28 = require("zod");
var updateControlpanelArgsSchema = import_zod28.z.object({
  path: import_zod28.z.string(),
  data: import_zod28.z.any()
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
var import_zod29 = require("zod");
var deleteControlpanelArgsSchema = import_zod29.z.object({
  path: import_zod29.z.string(),
  data: import_zod29.z.any()
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
var import_zod30 = require("zod");
var emailNotificationDataSchema = import_zod30.z.object({
  name: import_zod30.z.string(),
  from: import_zod30.z.string(),
  subject: import_zod30.z.string(),
  message: import_zod30.z.string()
});
var emailNotificationArgsSchema = import_zod30.z.object({
  user: import_zod30.z.string().optional(),
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
var import_zod31 = require("zod");
var emailSendDataSchema = import_zod31.z.object({
  name: import_zod31.z.string(),
  from: import_zod31.z.string(),
  to: import_zod31.z.string(),
  subject: import_zod31.z.string(),
  message: import_zod31.z.string()
});
var emailSendArgsSchema = import_zod31.z.object({
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
var import_zod32 = require("zod");
var getGroupSchema = import_zod32.z.object({
  id: import_zod32.z.string()
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
var import_zod34 = require("zod");

// src/validation/groups.ts
var import_zod33 = require("zod");
var createGroupDataSchema = import_zod33.z.object({
  description: import_zod33.z.string().optional(),
  email: import_zod33.z.string().optional(),
  groupname: import_zod33.z.string(),
  groups: import_zod33.z.array(import_zod33.z.string()).optional(),
  roles: import_zod33.z.array(import_zod33.z.string()).optional(),
  title: import_zod33.z.string().optional(),
  users: import_zod33.z.array(import_zod33.z.string()).optional()
});
var updateGroupDataSchema = import_zod33.z.object({
  description: import_zod33.z.string().optional(),
  email: import_zod33.z.string().optional(),
  title: import_zod33.z.string().optional()
});

// src/restapi/groups/create.ts
var createGroupArgsSchema = import_zod34.z.object({
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
var import_zod35 = require("zod");
var updateGroupArgsSchema = import_zod35.z.object({
  id: import_zod35.z.string(),
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
var import_zod36 = require("zod");
var deleteGroupArgsSchema = import_zod36.z.object({
  id: import_zod36.z.string()
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
var import_zod37 = require("zod");
var getHistorySchema = import_zod37.z.object({
  path: import_zod37.z.string()
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
var import_zod38 = require("zod");
var getHistoryVersionSchema = import_zod38.z.object({
  path: import_zod38.z.string(),
  version: import_zod38.z.number()
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
var import_zod40 = require("zod");

// src/validation/history.ts
var import_zod39 = require("zod");
var revertHistoryDataSchema = import_zod39.z.object({
  version: import_zod39.z.number()
});

// src/restapi/history/revert.ts
var revertHistoryArgsSchema = import_zod40.z.object({
  path: import_zod40.z.string(),
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
var import_zod41 = require("zod");
var getLinkintegriyArgsSchema = import_zod41.z.object({
  uids: import_zod41.z.string()
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
var import_zod42 = require("zod");
var getLockSchema = import_zod42.z.object({
  path: import_zod42.z.string()
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
var import_zod44 = require("zod");

// src/validation/lock.ts
var import_zod43 = require("zod");
var createLockDataSchema = import_zod43.z.object({
  stealable: import_zod43.z.boolean().optional(),
  timeout: import_zod43.z.number().optional()
});
var deleteLockDataSchema = import_zod43.z.object({
  force: import_zod43.z.boolean().optional()
});

// src/restapi/lock/create.ts
var createLockArgsSchema = import_zod44.z.object({
  path: import_zod44.z.string(),
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
var import_zod45 = require("zod");
var updateLockArgsSchema = import_zod45.z.object({
  path: import_zod45.z.string(),
  locktoken: import_zod45.z.string()
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
var import_zod46 = require("zod");
var deleteLockArgsSchema = import_zod46.z.object({
  path: import_zod46.z.string(),
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
var import_zod47 = require("zod");
var loginArgsSchema = import_zod47.z.object({
  data: import_zod47.z.object({
    login: import_zod47.z.string(),
    password: import_zod47.z.string()
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
var import_zod48 = require("zod");
var getNavigationSchema = import_zod48.z.object({
  path: import_zod48.z.string(),
  depth: import_zod48.z.number().optional()
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
var import_zod49 = require("zod");
var getNavrootSchema = import_zod49.z.object({
  path: import_zod49.z.string(),
  language: import_zod49.z.string().optional()
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
var import_zod50 = require("zod");
var getPrincipalsSchema = import_zod50.z.object({
  search: import_zod50.z.string()
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
var import_zod51 = require("zod");
var getQuerysourcesSchema = import_zod51.z.object({
  path: import_zod51.z.string(),
  field: import_zod51.z.string(),
  query: import_zod51.z.string()
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
var import_zod53 = require("zod");

// src/validation/querystring-search.ts
var import_zod52 = require("zod");
var query = import_zod52.z.object({
  i: import_zod52.z.string(),
  o: import_zod52.z.string(),
  v: import_zod52.z.union([import_zod52.z.string(), import_zod52.z.array(import_zod52.z.string())])
});
var querystringSearchDataSchema = import_zod52.z.object({
  b_start: import_zod52.z.string().optional(),
  b_size: import_zod52.z.string().optional(),
  limit: import_zod52.z.string().optional(),
  sort_on: import_zod52.z.string().optional(),
  sort_order: import_zod52.z.string().optional(),
  fullobjects: import_zod52.z.boolean().optional(),
  query: import_zod52.z.array(query),
  post: import_zod52.z.boolean().optional()
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
var import_zod54 = require("zod");
var getRegistryRecordSchema = import_zod54.z.object({
  name: import_zod54.z.string()
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
var import_zod56 = require("zod");

// src/validation/registry.ts
var import_zod55 = require("zod");
var updateRegistryDataSchema = import_zod55.z.record(import_zod55.z.any());

// src/restapi/registry/update.ts
var updateRegistryArgsSchema = import_zod56.z.object({
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
var import_zod57 = require("zod");
var getRelationsSchema = import_zod57.z.object({
  source: import_zod57.z.string().optional(),
  relation: import_zod57.z.string().optional(),
  onlyBroken: import_zod57.z.boolean().optional()
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
var import_zod59 = require("zod");

// src/validation/relations.ts
var import_zod58 = require("zod");
var RelationDataSchema = import_zod58.z.object({
  relation: import_zod58.z.string(),
  source: import_zod58.z.string(),
  target: import_zod58.z.string()
});
var createRelationsDataSchema = import_zod58.z.object({
  items: import_zod58.z.array(RelationDataSchema)
});
var deleteRelationsDataSchema = import_zod58.z.object({
  items: import_zod58.z.array(RelationDataSchema).optional(),
  relation: import_zod58.z.string().optional(),
  source: import_zod58.z.string().optional(),
  target: import_zod58.z.string().optional()
});
var fixRelationsDataSchema = import_zod58.z.object({
  flush: import_zod58.z.number().optional()
});

// src/restapi/relations/create.ts
var createRelationsArgsSchema = import_zod59.z.object({
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
var import_zod60 = require("zod");
var fixRelationsArgsSchema = import_zod60.z.object({
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
var import_zod61 = require("zod");
var deleteRelationsArgsSchema = import_zod61.z.object({
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
var import_zod62 = require("zod");
var createRuleArgsSchema = import_zod62.z.object({
  ruleId: import_zod62.z.string()
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
var import_zod64 = require("zod");

// src/validation/rules.ts
var import_zod63 = require("zod");
var updateRulesDataSchema = import_zod63.z.object({
  "form.button.Bubble": import_zod63.z.boolean().optional(),
  "form.button.NoBubble": import_zod63.z.boolean().optional(),
  "form.button.Enable": import_zod63.z.boolean().optional(),
  "form.button.Disable": import_zod63.z.boolean().optional(),
  rules_ids: import_zod63.z.array(import_zod63.z.string()).optional(),
  operation: import_zod63.z.string().optional(),
  rule_id: import_zod63.z.string().optional()
});
var deleteRulesDataSchema = import_zod63.z.object({
  rules_ids: import_zod63.z.array(import_zod63.z.string())
});

// src/restapi/rules/update.ts
var updateRulesArgsSchema = import_zod64.z.object({
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
var import_zod65 = require("zod");
var deleteRulesArgsSchema = import_zod65.z.object({
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
var import_zod67 = require("zod");

// src/validation/search.ts
var import_zod66 = require("zod");
var querySchema = import_zod66.z.object({
  path: import_zod66.z.object({
    query: import_zod66.z.union([import_zod66.z.string(), import_zod66.z.array(import_zod66.z.string())]),
    depth: import_zod66.z.number().optional()
  }).optional(),
  sort_on: import_zod66.z.union([import_zod66.z.string(), import_zod66.z.array(import_zod66.z.string())]).optional(),
  SearchableText: import_zod66.z.string().optional(),
  metadata_fields: import_zod66.z.union([import_zod66.z.string(), import_zod66.z.array(import_zod66.z.string())]).optional(),
  fullobjects: import_zod66.z.number().optional()
}).and(import_zod66.z.record(import_zod66.z.any()));
var searchSchema = import_zod66.z.object({
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
var import_zod68 = require("zod");
var getSourceSchema = import_zod68.z.object({
  path: import_zod68.z.string(),
  field: import_zod68.z.string()
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
var import_zod70 = require("zod");

// src/validation/transactions.ts
var import_zod69 = require("zod");
var revertTransactionsDataSchema = import_zod69.z.object({
  transaction_ids: import_zod69.z.array(import_zod69.z.string())
});

// src/restapi/transactions/revert.ts
var revertTransactionsArgsSchema = import_zod70.z.object({
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
var import_zod71 = require("zod");
var getTranslationSchema = import_zod71.z.object({
  path: import_zod71.z.string()
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
var import_zod73 = require("zod");

// src/validation/translations.ts
var import_zod72 = require("zod");
var linkTranslationDataSchema = import_zod72.z.object({
  id: import_zod72.z.string()
});
var unlinkTranslationDataSchema = import_zod72.z.object({
  language: import_zod72.z.string()
});

// src/restapi/translations/link.ts
var linkTranslationArgsSchema = import_zod73.z.object({
  path: import_zod73.z.string(),
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
var import_zod74 = require("zod");
var unlinkTranslationArgsSchema = import_zod74.z.object({
  path: import_zod74.z.string(),
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
var import_zod75 = require("zod");
var getTypeSchema = import_zod75.z.object({
  type: import_zod75.z.string()
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
var import_zod76 = require("zod");
var getTypeFieldSchema = import_zod76.z.object({
  contentFieldPath: import_zod76.z.string()
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
var import_zod78 = require("zod");

// src/validation/types.ts
var import_zod77 = require("zod");
var createTypeFieldDataSchema = import_zod77.z.object({
  description: import_zod77.z.string(),
  factory: import_zod77.z.string(),
  required: import_zod77.z.boolean().optional(),
  title: import_zod77.z.string()
});
var updateTypeFieldDataSchema = import_zod77.z.object({
  description: import_zod77.z.string().optional(),
  maxLength: import_zod77.z.number().optional(),
  minLength: import_zod77.z.number().optional(),
  fields: import_zod77.z.array(import_zod77.z.string()).optional(),
  required: import_zod77.z.boolean().optional(),
  title: import_zod77.z.string().optional(),
  properties: import_zod77.z.any().optional(),
  fieldsets: import_zod77.z.array(import_zod77.z.any()).optional()
});

// src/restapi/types/create_type_field.ts
var createTypeFieldArgsSchema = import_zod78.z.object({
  contentPath: import_zod78.z.string(),
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
var import_zod79 = require("zod");
var updateTypeFieldArgsSchema = import_zod79.z.object({
  contentPath: import_zod79.z.string(),
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
var import_zod81 = require("zod");

// src/validation/upgrade.ts
var import_zod80 = require("zod");
var runUpgradeDataSchema = import_zod80.z.object({
  dry_run: import_zod80.z.boolean()
});

// src/restapi/upgrade/run.ts
var runUpgradeArgsSchema = import_zod81.z.object({
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
var import_zod82 = require("zod");
var getUsersSchema = import_zod82.z.object({
  query: import_zod82.z.string().optional(),
  groupsFilter: import_zod82.z.array(import_zod82.z.string()).optional(),
  search: import_zod82.z.string().optional(),
  limit: import_zod82.z.number().optional()
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
var import_zod83 = require("zod");
var getUserSchema = import_zod83.z.object({
  id: import_zod83.z.string()
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
var import_zod85 = require("zod");

// src/validation/users.ts
var import_zod84 = require("zod");
var createUserDataSchema = import_zod84.z.object({
  description: import_zod84.z.string().optional(),
  email: import_zod84.z.string().email(),
  fullname: import_zod84.z.string().optional(),
  home_page: import_zod84.z.string().url().optional(),
  location: import_zod84.z.string().optional(),
  sendPasswordReset: import_zod84.z.boolean().optional(),
  username: import_zod84.z.string(),
  roles: import_zod84.z.array(import_zod84.z.string()).optional(),
  password: import_zod84.z.string().optional()
});
var portraitSchema = import_zod84.z.object({
  "content-type": import_zod84.z.string(),
  data: import_zod84.z.string(),
  encoding: import_zod84.z.string(),
  filename: import_zod84.z.string(),
  scale: import_zod84.z.boolean().optional()
});
var updateUserDataSchema = import_zod84.z.object({
  description: import_zod84.z.string().optional(),
  email: import_zod84.z.string().email().optional(),
  fullname: import_zod84.z.string().optional(),
  home_page: import_zod84.z.string().url().optional(),
  location: import_zod84.z.string().optional(),
  username: import_zod84.z.string().optional(),
  portrait: portraitSchema.optional()
});
var resetPasswordWithTokenDataSchema = import_zod84.z.object({
  reset_token: import_zod84.z.string(),
  new_password: import_zod84.z.string()
});
var updatePasswordDataSchema = import_zod84.z.object({
  new_password: import_zod84.z.string(),
  old_password: import_zod84.z.string()
});

// src/restapi/users/create.ts
var createUserArgsSchema = import_zod85.z.object({
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
var import_zod86 = require("zod");
var updateUserArgsSchema = import_zod86.z.object({
  id: import_zod86.z.string(),
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
var import_zod87 = require("zod");
var deleteUserArgsSchema = import_zod87.z.object({
  id: import_zod87.z.string()
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
var import_zod88 = require("zod");
var resetPasswordArgsSchema = import_zod88.z.object({
  id: import_zod88.z.string()
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
var import_zod89 = require("zod");
var resetPasswordWithTokenArgsSchema = import_zod89.z.object({
  id: import_zod89.z.string(),
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
var import_zod90 = require("zod");
var updatePasswordArgsSchema = import_zod90.z.object({
  id: import_zod90.z.string(),
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
var import_zod91 = require("zod");
var getVocabularySchema = import_zod91.z.object({
  path: import_zod91.z.string(),
  title: import_zod91.z.string().optional(),
  token: import_zod91.z.string().optional(),
  tokens: import_zod91.z.array(import_zod91.z.string()).optional()
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
var import_zod92 = require("zod");
var getWorkflowSchema = import_zod92.z.object({
  path: import_zod92.z.string()
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
var import_zod94 = require("zod");

// src/validation/workflow.ts
var import_zod93 = require("zod");
var createWorkflowDataSchema = import_zod93.z.object({
  comment: import_zod93.z.string().optional(),
  effective: import_zod93.z.string().optional(),
  expires: import_zod93.z.string().optional(),
  include_children: import_zod93.z.boolean().optional()
});

// src/restapi/workflow/create.ts
var createWorkflowArgsSchema = import_zod94.z.object({
  path: import_zod94.z.string(),
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
var import_zod95 = require("zod");
var getWorkingcopySchema = import_zod95.z.object({
  path: import_zod95.z.string()
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
var import_zod96 = require("zod");
var createWorkingcopyArgsSchema = import_zod96.z.object({
  path: import_zod96.z.string()
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
var import_zod97 = require("zod");
var checkInWorkingcopyArgsSchema = import_zod97.z.object({
  path: import_zod97.z.string()
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
var import_zod98 = require("zod");
var deleteWorkingcopyArgsSchema = import_zod98.z.object({
  path: import_zod98.z.string()
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
